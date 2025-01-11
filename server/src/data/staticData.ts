import { CompletionItem, CompletionItemKind, InsertTextFormat, ParameterInformation, SignatureInformation } from 'vscode-languageserver';
import { CommonRoutineInfo, Direction, GameVariable, GroundStateStruct, LevelInfo, LivesEntityInfo, MenuId, ObjectInfo, OpCode, ProcessSpecialId, SpriteEffectId } from './types';
import { buildConstantStore, StaticConstantStore } from './constantStore';
import { RomRegion } from './romData';

import * as scriptData from '../../data/pmd2scriptdata.json';
import * as opcodeDocs from '../../data/opcode_descriptions.json';

// Static data that is loaded once from `pmd2scriptdata.json`
interface ScriptData {
	common: CommonData;
	na: RegionalData;
	eu: RegionalData;
	jp: RegionalData;
};

interface CommonData {
	gameVariables: GameVariable[];
	gameVariablesExtended: GameVariable[];
	faceNames: string[];
	facePositionModes: string[];
	directions: Direction[];
	commonRoutineInfo: CommonRoutineInfo[];
	menuIds: MenuId[];
	processSpecialIds: ProcessSpecialId[];
	spriteEffectIds: SpriteEffectId[];
	backgroundMusicIds: string[];
	opCodes: OpCode[];
	groundStateStructs: GroundStateStruct[];
};

interface RegionalData {
	levelList: LevelInfo[];
	livesEntityTable: LivesEntityInfo[];
	objectsList: ObjectInfo[];
};

// Types for opcode_descriptionson
interface OpcodeDocs {
	args: ArgumentDocs[];
	description: string;
	name: string;
	targeted?: boolean;
}

interface ArgumentDocs {
	description: string;
	name: string;
}

export const DUNGEON_MODES = {
	CLOSED: 0,
	OPEN: 1,
	REQUEST: 2,
	OPEN_AND_REQUEST: 3,
};

export let SCRIPT_DATA: ScriptData = scriptData as ScriptData;
export let OPCODE_DOCS: Map<string, OpcodeDocs[]> = loadOpcodeDocs();
export let GLOBAL_OPCODE_COMPLETION_ITEMS: CompletionItem[] = buildOpCodeCompletionItems();
export let GLOBAL_OPCODE_COMPLETION_ITEMS_BY_NAME: Map<string, CompletionItem[]> = buildOpCodeCompletionItemsByName();

function loadOpcodeDocs(): Map<string, OpcodeDocs[]> {
	const opcodeDocsMap = new Map<string, OpcodeDocs[]>();
	for (const doc of opcodeDocs.opcodes) {
		if (!opcodeDocsMap.has(doc.name)) {
			opcodeDocsMap.set(doc.name, []);
		}
		opcodeDocsMap.get(doc.name)!.push(doc);
	}
	return opcodeDocsMap;
}

function buildOpCodeDetailString(opCode: OpCode, targeted: boolean): string {
	let detailString = `${opCode.name}`;
	if (targeted) {
		detailString += '<…>';
	}
	detailString += '(';
	if (opCode.arguments) {
		for (let i = 0; i < opCode.arguments.length; i++) {
			const arg = opCode.arguments[i];
			detailString += arg.name + ': ' + arg.type;
			if (i < opCode.arguments.length - 1) {
				detailString += ', ';
			}
		}
	}
	detailString += ')';
	return detailString;
}

function buildInsertText(opCode: OpCode, targeted: boolean): string {
	let insertText = `${opCode.name}`;
	if ((!opCode.arguments || opCode.arguments.length === 0) && !targeted) {
		// Automatically add parentheses if there are no arguments, unless we might miss an inline context
		insertText += '();';
	}
	return insertText;
}

function buildOpCodeCompletionItems(): CompletionItem[] {
	const opCodeCompletionItems: CompletionItem[] = [];

	let previousOpCodeName = '';
	let consecutiveItemsWithSameName = 0; // TODO: this is dumb, but indices in opcode_descriptionson are broken
	for (const opCode of SCRIPT_DATA.common.opCodes) {
		if (opCode.name === previousOpCodeName) {
			consecutiveItemsWithSameName++;
		} else {
			consecutiveItemsWithSameName = 0;
		}
		
		const docItem = OPCODE_DOCS.get(opCode.name)?.[consecutiveItemsWithSameName];

		opCodeCompletionItems.push({
			label: opCode.name,
			kind: CompletionItemKind.Function,
			insertText: buildInsertText(opCode, docItem?.targeted ?? false),
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: docItem ? docItem.description : '',
			detail: buildOpCodeDetailString(opCode, docItem?.targeted ?? false),
			data: opCode,
		});
	}
	return opCodeCompletionItems;
}

function buildOpCodeCompletionItemsByName(): Map<string, CompletionItem[]> {
	const opCodeCompletionItemsByName: Map<string, CompletionItem[]> = new Map();
	for (const opCode of GLOBAL_OPCODE_COMPLETION_ITEMS) {
		if (!opCodeCompletionItemsByName.has(opCode.label)) {
			opCodeCompletionItemsByName.set(opCode.label, []);
		}
		opCodeCompletionItemsByName.get(opCode.label)!.push(opCode);
	}
	return opCodeCompletionItemsByName;
}

export function reloadScriptData() {
	GLOBAL_OPCODE_COMPLETION_ITEMS = buildOpCodeCompletionItems();
	GLOBAL_OPCODE_COMPLETION_ITEMS_BY_NAME = buildOpCodeCompletionItemsByName();
}

export function getOpCodeSignatureInfo(opCodeName: string): SignatureInformation[] | null {
	const completionItems = GLOBAL_OPCODE_COMPLETION_ITEMS_BY_NAME.get(opCodeName);
	if (!completionItems) {
		return null;
	}

	const docs = OPCODE_DOCS.get(opCodeName);

	return completionItems.map((completionItem, index) => {
		const params: ParameterInformation[] = [];
		if (docs && docs[index]) {
			for (const arg of docs[index].args) {
				const param: ParameterInformation = {
					label: arg.name,
					documentation: arg.description,
				};
				params.push(param);
			}
		}

		return {
			label: completionItem.detail ?? completionItem.label,
			documentation: completionItem.documentation,
			parameters: params
		};
	});
}

export let CONSTANTS_BY_REGION: Map<RomRegion, StaticConstantStore> = new Map();

export function getRegionalConstants(region: RomRegion): StaticConstantStore {
	if (!CONSTANTS_BY_REGION.has(region)) {
		CONSTANTS_BY_REGION.set(region, buildConstantStore(region));
	}
	return CONSTANTS_BY_REGION.get(region)!;
}

export function createWikiUrlForOpcode(opcode: OpCode): string {
	return `https://wiki.skytemple.org/index.php/List_of_Opcodes#0x${opcode.id.toString(16)}_-_${opcode.name}`;
}