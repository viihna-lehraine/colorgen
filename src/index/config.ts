// File: src/index/config.ts

import { ColorSpace } from '../index/index.js';

export interface DefaultKeysInterface {
	APP_SETTINGS: string;
	CUSTOM_COLOR: string;
}

export interface DefaultSettingsInterface {
	colorSpace: ColorSpace;
	lastTableID: number;
	theme: 'light' | 'dark';
	loggingEnabled: boolean;
}

export interface StoreNamesInterface {
	APP_SETTINGS: string;
	CUSTOM_COLOR: string;
	MUTATIONS: string;
	PALLETES: string;
	SETTINGS: string;
	TABLES: string;
}

export interface ConfigDBInterface {
	DEFAULT_KEYS: DefaultKeysInterface;
	DEFAULT_SETTINGS: DefaultSettingsInterface;
	STORE_NAMES: StoreNamesInterface;
}

export interface ConfigInterface {
	db: ConfigDBInterface;
}
