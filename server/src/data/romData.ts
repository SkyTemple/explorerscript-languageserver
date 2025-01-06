import { existsSync } from "fs";
import { connection } from "../server.js";
import { LevelInfo, LivesEntityInfo, ObjectInfo } from "./types.js";
import type { NitroFS } from "nitro-fs";
import { readFile } from "fs/promises";
import { buildConstantStore, StaticConstantStore } from "./constantStore.js";

export type RomRegion = 'na' | 'eu' | 'jp';

const ACTOR_LIST_PATH = 'BALANCE/actor_list.bin';
const OBJECT_LIST_PATH = 'BALANCE/objects.bin';
const LEVEL_LIST_PATH = 'BALANCE/level_list.bin';

// Code for extracting actor, object, and level data from a ROM file.
// The data is only read if the corresponding patches were applied to the ROM,
// otherwise static data is used.
export class RomData {
  romPath: string = '';
  region: RomRegion = 'na';
  constants!: StaticConstantStore;

  static async load(romPath: string): Promise<RomData> {
    connection.console.log(`Loading ROM data from ${romPath}`);
    const startTime = Date.now();

    if (!existsSync(romPath)) {
      throw new Error(`ROM file not found: ${romPath}`);
    }
    
    let that = new RomData();
    that.romPath = romPath;

    // Read the entire ROM file into memory.
    // This is extremely inefficient, but the nitro-fs library requires a buffer and I currently don't feel like writing a custom library.
    const rom = (await readFile(romPath)).buffer;

    const { NitroFS } = await import('nitro-fs');
    const nitroFS = NitroFS.fromRom(rom);

    that.region = extractRegion(nitroFS.cartridgeHeader.gameCode);

    let actors = readActorList(nitroFS);
    let objects = readObjectList(nitroFS);
    let levels = readLevelList(nitroFS);

    that.constants = buildConstantStore(that.region, { actors, objects, levels });

    connection.console.log(`Loaded ROM data in ${Date.now() - startTime}ms`);
    connection.console.log(`Region: ${that.region}`);
    connection.console.log(`Actors: ${actors?.length ?? 'N/A'}`);
    connection.console.log(`Objects: ${objects?.length ?? 'N/A'}`);
    connection.console.log(`Levels: ${levels?.length ?? 'N/A'}`);

    return that;
  }
}

function extractRegion(gameCode: string): RomRegion {
  switch (gameCode) {
    case 'C2SE':
      return 'na';
    case 'C2SP':
      return 'eu';
    case 'C2SJ':
      return 'jp';
    default:
      throw new Error(`Unknown game code: ${gameCode}`);
  }
}

// See https://github.com/SkyTemple/skytemple-files/blob/master/skytemple_files/list/actor/model.py
function readActorList(nitroFS: NitroFS): LivesEntityInfo[] | undefined {
  if (!nitroFS.exists(ACTOR_LIST_PATH)) {
    return undefined;
  }

  const actorListData = nitroFS.readFile(ACTOR_LIST_PATH);
  const actorList = new DataView(actorListData);
  const sir0 = new Sir0(actorList);

  const pointerStart = actorList.getUint32(sir0.header.dataOffset, true);
  const numberEntries = actorList.getUint32(sir0.header.dataOffset + 4, true);

  const ENTRY_SIZE = 12;

  const actors: LivesEntityInfo[] = [];
  for (let i = 0; i < numberEntries; i++) {
    const entryOffset = pointerStart + i * ENTRY_SIZE;

    const type = actorList.getUint16(entryOffset, true);
    const entid = actorList.getUint16(entryOffset + 2, true);
    const nameOffset = actorList.getUint32(entryOffset + 4, true);
    const name = readNullTerminatedString(actorList, nameOffset);
    const unk4 = actorList.getUint16(entryOffset + 8, true);

    actors.push({
      name,
      type,
      entid,
      unk4,
    });
  }

  return actors;
}

// See https://github.com/SkyTemple/skytemple-files/blob/master/skytemple_files/list/level/model.py
function readLevelList(nitroFS: NitroFS): LevelInfo[] | undefined {
  if (!nitroFS.exists(LEVEL_LIST_PATH)) {
    return undefined;
  }

  const levelListData = nitroFS.readFile(LEVEL_LIST_PATH);
  const levelList = new DataView(levelListData);
  const sir0 = new Sir0(new DataView(levelListData));

  const ENTRY_SIZE = 12;

  const levels: LevelInfo[] = [];
  for (let i = 0; i < 2000; i++) {
    const entryOffset = sir0.header.dataOffset + i * ENTRY_SIZE;
    const mapty = levelList.getUint16(entryOffset, true);
    const mapid = levelList.getUint16(entryOffset + 4, true);
    const nameOffset = levelList.getUint32(entryOffset + 8, true);

    if (mapty === 0xaaaa && mapid === 0xaaaa) { // Terminator
      break;
    }

    const name = readNullTerminatedString(levelList, nameOffset);
    levels.push({
      name,
      mapty,
      mapid,
    });
  }

  return levels;
}

// See https://github.com/SkyTemple/skytemple-files/blob/master/skytemple_files/list/object/model.py
function readObjectList(nitroFS: NitroFS): ObjectInfo[] | undefined {
  if (!nitroFS.exists(OBJECT_LIST_PATH)) {
    return undefined;
  }

  const objectListData = nitroFS.readFile(OBJECT_LIST_PATH);
  const objectList = new DataView(objectListData);

  const ENTRY_SIZE = 16;

  const objects: ObjectInfo[] = [];
  for (let i = 0; i < objectList.byteLength / ENTRY_SIZE; i++) {
    const entryOffset = i * ENTRY_SIZE;
    const unk1 = objectList.getUint16(entryOffset, true);
    let name = readNullTerminatedString(objectList, entryOffset + 5);

    if (name === '') {
      name = 'NULL';
    }

    objects.push({
      name,
      unk1,
    });
  }

  return objects;
}

//
// SIR0 decoding
//

interface Sir0Header {
  dataOffset: number;
  pointerListOffset: number;
}

class Sir0 {
  data: DataView;
  header: Sir0Header;
  pointerOffsets: number[];

  constructor(data: DataView) {
    let pos = 0;
    const magic =
      String.fromCharCode(data.getUint8(pos)) +
      String.fromCharCode(data.getUint8(pos + 1)) +
      String.fromCharCode(data.getUint8(pos + 2)) +
      String.fromCharCode(data.getUint8(pos + 3));
    pos += 4;

    if (magic !== 'SIR0') {
      throw new Error(`Invalid SIR0 magic: ${magic}`);
    }

    const dataOffset = data.getUint32(pos, true);
    pos += 4;
    const pointerListOffset = data.getUint32(pos, true);
    pos += 4;

    const header: Sir0Header = {
      dataOffset,
      pointerListOffset,
    };

    const pointerOffsets = decodeSIR0PointerOffsets(data, pointerListOffset);

    this.data = data;
    this.header = header;
    this.pointerOffsets = pointerOffsets;
  }
}

// See https://projectpokemon.org/home/docs/mystery-dungeon-nds/sir0siro-format-r46/
function decodeSIR0PointerOffsets(data: DataView, startOffset: number): number[] {
  const offsets: number[] = [];
  let curPos = startOffset;
  let offsetSum = 0;
  let buffer = 0;
  let lastHadBitFlag = false;

  while (true) {
    if (curPos >= data.byteLength) {
      break;
    }

    const curByte = data.getUint8(curPos++);
    if (!lastHadBitFlag && curByte === 0) {
      break;
    }

    buffer |= (curByte & 0x7f);

    if ((curByte & 0x80) !== 0) {
      // If highest bit set, shift left 7 to prepare for next byte
      lastHadBitFlag = true;
      buffer <<= 7;
    } else {
      lastHadBitFlag = false;
      offsetSum += buffer;
      offsets.push(offsetSum);
      buffer = 0;
    }
  }

  return offsets;
}

function readNullTerminatedString(data: DataView, offset: number): string {
  let str = '';
  while (data.getUint8(offset) !== 0) {
    str += String.fromCharCode(data.getUint8(offset++));
  }
  return str;
}