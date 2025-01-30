// File: types/db.js

import { IDBPDatabase } from 'idb';
import { ColorSpace, HSL, Palette, UnbrandedPalette } from '../index.js';

export interface MutationLog {
	timestamp: string;
	key: string;
	action: 'add' | 'delete' | 'update';
	newValue: unknown;
	oldValue: unknown;
	origin: string;
}

export type PaletteDB = IDBPDatabase<PaletteSchema>;

export interface PaletteSchema {
	customColor: {
		key: string;
		value: { color: HSL };
	};
	mutations: {
		key: string;
		timestamp: string;
		value: MutationLog;
	};
	settings: {
		key: string;
		value: Settings;
	};
	tables: {
		key: string;
		value: StoredPalette[];
	};
}

export interface Settings {
	colorSpace: ColorSpace;
	lastTableID: number;
	loggingEnabled: boolean;
	maxHistory: number;
	theme: 'light' | 'dark';
}

export interface StoredPalette {
	tableID: number;
	palette: Palette;
}

export interface UnbrandedStoredPalette {
	tableID: number;
	palette: UnbrandedPalette;
}
