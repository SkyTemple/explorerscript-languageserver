export interface GameVariable {
	name: string;
	type: number;
	unk1: number;
	memOffset: number;
	bitShift: number;
	nbValues: number;
	unk4: number;
};

export interface Direction {
	id: number;
	name: string;
};

export interface CommonRoutineInfo {
	id: number;
	unk1: number;
	name: string;
};

export interface MenuId {
	id: number;
	name: string;
};

export interface ProcessSpecialId {
	id: number;
	name: string;
};

export interface SpriteEffectId {
	id: number;
	name: string;
};

export interface OpCode {
	id: number;
	name: string;
	params: number;
	arguments?: OpCodeArgument[];
};

export interface OpCodeArgument {
	id: number;
	type: OpCodeArgType;
	name: string;
	repeating?: boolean;
	arguments?: OpCodeArgument[];
};

export type OpCodeArgType =
	| 'Level'
	| 'uint'
	| 'sint'
	| 'String'
	| 'GameVar'
	| 'Routine'
	| 'Bgm'
	| 'ConstString'
	| 'Entity'
	| 'PositionMark'
	| 'Object'
	| 'Effect'
	| 'ProcessSpecial'
	| 'Direction'
	| 'Menu'
	| 'Face'
	| 'FaceMode';

export interface GroundStateStruct {
	name: string;
	offset: number;
	entryLength: number;
	maxEntries: number;
};

export interface LevelInfo {
	name: string;
	mapty: number;
	mapid: number;
};

export interface LivesEntityInfo {
	name: string;
	type: number;
	entid: number;
	unk4: number;
};

export interface ObjectInfo {
	unk1: number;
	name: string;
};
