import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { LevelInfo, LivesEntityInfo, ObjectInfo } from "./types.js";
import { RomRegion } from "./romData.js";
import { DUNGEON_MODES, SCRIPT_DATA } from "./staticData.js";

export type ConstantType = 'variable'
	| 'faceName'
	| 'facePositionMode'
	| 'direction'
	| 'coroutine'
	| 'menuId'
	| 'processSpecialId'
	| 'spriteEffectId'
	| 'backgroundMusicId'
	| 'opCode'
	| 'actor'
	| 'object'
	| 'level'
	| 'dungeonMode';

export interface ExplorerScriptStaticConstant {
	name: string;
	value: number;
	type: ConstantType;
	documentation?: string;
}

export interface StaticConstantStore {
	all: ExplorerScriptStaticConstant[];
	byName: Map<string, ExplorerScriptStaticConstant>;
	completionItems: CompletionItem[];
}

function buildActorConstants(lives: LivesEntityInfo[]): ExplorerScriptStaticConstant[] {
	const constants: ExplorerScriptStaticConstant[] = [];
	for (let i = 0; i < lives.length; i++) {
		const live = lives[i];
		constants.push({
			name: `ACTOR_${live.name}`,
			value: i,
			documentation: `Actor (value: ${i})`,
			type: 'actor',
		});
	}
	return constants;
}

function buildObjectConstants(objectsList: ObjectInfo[]): ExplorerScriptStaticConstant[] {
	const constants: ExplorerScriptStaticConstant[] = [];
	for (let i = 0; i < objectsList.length; i++) {
		const obj = objectsList[i];
		constants.push({
			name: `OBJECT_${obj.name}_${i}`,
			value: i,
			documentation: `Object (value: ${i})`,
			type: 'object',
		});
	}
	return constants;
}

function buildLevelConstants(levelList: LevelInfo[]): ExplorerScriptStaticConstant[] {
	const constants: ExplorerScriptStaticConstant[] = [];
	for (const level of levelList) {
		constants.push({
			name: `LEVEL_${level.name}`,
			value: level.mapid,
			documentation: `Level (value: ${level.mapid})`,
			type: 'level',
		});
	}
	return constants;
}

// Based on https://github.com/SkyTemple/skytemple-files/blob/51d5442773e64b9ceb9afa272a1d9f9594df729e/skytemple_files/script/ssb/constants.py#L139
export function buildConstantStore(region: RomRegion, dynamicConstants?: {
	actors?: LivesEntityInfo[],
	objects?: ObjectInfo[],
	levels?: LevelInfo[],
 }): StaticConstantStore {
	let regionalData;
	switch (region) {
		case 'na':
			regionalData = SCRIPT_DATA.na;
			break;
		case 'eu':
			regionalData = SCRIPT_DATA.eu;
			break;
		case 'jp':
			regionalData = SCRIPT_DATA.jp;
			break;
		default:
			throw new Error('Invalid region');
	}

	// If dynamic constants from the ROM are passed, use them instead of the static ones
	const constants: ExplorerScriptStaticConstant[] = [
		...buildActorConstants(dynamicConstants?.actors ?? regionalData.livesEntityTable),
		...buildObjectConstants(dynamicConstants?.objects ?? regionalData.objectsList),
		...buildLevelConstants(dynamicConstants?.levels ?? regionalData.levelList),
	];

	// Routines
	for (const routine of SCRIPT_DATA.common.commonRoutineInfo) {
		constants.push({
			name: `CORO_${routine.name}`,
			value: routine.id,
			documentation: `Routine (value: ${routine.id})`,
			type: 'coroutine',
		});
	}

	// Face names
	for (let i = 0; i < SCRIPT_DATA.common.faceNames.length; i++) {
		const faceName = SCRIPT_DATA.common.faceNames[i];
		constants.push({
			name: `FACE_${faceName.replace(/-/g, '_')}`,
			value: i,
			documentation: `Portrait index (value: ${i})`,
			type: 'faceName',
		});
	}

	// Face position modes
	for (let i = 0; i < SCRIPT_DATA.common.facePositionModes.length; i++) {
		const facePositionMode = SCRIPT_DATA.common.facePositionModes[i];
		constants.push({
			name: `FACE_POS_${facePositionMode.toUpperCase()}`,
			value: i,
			documentation: `Portrait position (value: ${i})`,
			type: 'facePositionMode',
		});
	}

	// Game variables
	for (const [i, gameVar] of SCRIPT_DATA.common.gameVariables.entries()) {
		constants.push({
			name: `\$${gameVar.name}`,
			value: i,
			documentation: `Game variable (value: ${i})`,
			type: 'variable',
		});
	}

	// Menus
	for (const menu of SCRIPT_DATA.common.menuIds) {
		constants.push({
			name: `MENU_${camelToScreamingSnakeCase(menu.name)}`,
			value: menu.id,
			documentation: `Menu (value: ${menu.id})`,
			type: 'menuId',
		});
	}

	// Special processes
	for (const processSpecial of SCRIPT_DATA.common.processSpecialIds) {
		constants.push({
			name: `PROCESS_SPECIAL_${camelToScreamingSnakeCase(processSpecial.name)}`,
			value: processSpecial.id,
			documentation: `Special process (value: ${processSpecial.id})`,
			type: 'processSpecialId',
		});
	}

	// Background music
	for (let i = 0; i < SCRIPT_DATA.common.backgroundMusicIds.length; i++) {
		const bgm = SCRIPT_DATA.common.backgroundMusicIds[i];
		constants.push({
			name: `BGM_${camelToScreamingSnakeCase(bgm)}`,
			value: i,
			documentation: `Background music (value: ${i})`,
			type: 'backgroundMusicId',
		});
	}

	// Sprite effects
	for (const spriteEffect of SCRIPT_DATA.common.spriteEffectIds) {
		constants.push({
			name: `EFFECT_${camelToScreamingSnakeCase(spriteEffect.name)}`,
			value: spriteEffect.id,
			documentation: `Sprite effect (value: ${spriteEffect.id})`,
			type: 'spriteEffectId',
		});
	}

	// Directions
	for (const direction of SCRIPT_DATA.common.directions) {
		constants.push({
			name: `DIR_${direction.name.toUpperCase()}`,
			value: direction.id,
			documentation: `Direction (value: ${direction.id})`,
			type: 'direction',
		});
	}

	// Dungeon modes
	for (const [modeName, modeValue] of Object.entries(DUNGEON_MODES)) {
		constants.push({
			name: `DUNGEON_MODE_${modeName}`,
			value: modeValue,
			documentation: `Dungeon mode (value: ${modeValue})`,
			type: 'dungeonMode',
		});
	}

	return {
		all: constants,
		byName: new Map(constants.map(constant => [constant.name, constant])),
		completionItems: constants.map(constant => ({
			label: constant.name,
			kind: constant.type === 'variable' ? CompletionItemKind.Field : CompletionItemKind.Constant,
			documentation: constant.documentation,
		})),
	};
}

function camelToScreamingSnakeCase(camelCase: string): string {
	return camelCase.replace(/(?<!^)(?=[A-Z])/g, letter => `_${letter}`).toUpperCase();
}