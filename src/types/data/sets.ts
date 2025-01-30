// File: types/sets.js

import { dataSets } from '../../data/sets.js';

export type ByteRange = number & { __brand: 'ByteRange' };

export type HexSet = string & { __brand: 'HexSet' };

export type LAB_L = number & { __brand: 'LAB_L' };

export type LAB_A = number & { __brand: 'LAB_A' };

export type LAB_B = number & { __brand: 'LAB_B' };

export type Percentile = number & { __brand: 'Percentile' };

export type Radial = number & { __brand: 'Radial' };

export type XYZ_X = number & { __brand: 'XYZ_X' };

export type XYZ_Y = number & { __brand: 'XYZ_Y' };

export type XYZ_Z = number & { __brand: 'XYZ_Z' };

export type RangeKeyMap = {
	ByteRange: ByteRange;
	HexSet: HexSet;
	LAB_L: LAB_L;
	LAB_A: LAB_A;
	LAB_B: LAB_B;
	Percentile: Percentile;
	Radial: Radial;
	XYZ_X: XYZ_X;
	XYZ_Y: XYZ_Y;
	XYZ_Z: XYZ_Z;
};

export type ColorValueRange = RangeKeyMap[keyof RangeKeyMap];

export type NumericRangeKey = {
	[K in keyof typeof dataSets]: (typeof dataSets)[K] extends readonly [
		number,
		number
	]
		? K
		: never;
}[keyof typeof dataSets & string];

export type Sets = typeof dataSets;
