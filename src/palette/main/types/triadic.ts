// File: palette/main/types/triadic.js

import {
	HSL,
	Palette,
	PaletteGenerationArgs,
	PaletteItem
} from '../../../types/index.js';
import { IDBManager } from '../../../db/IDBManager.js';
import { coreUtils, utils } from '../../../common/index.js';
import { constsData as consts } from '../../../data/consts.js';
import { superUtils as paletteSuperUtils } from '../../common/index.js';
import { uiFn } from '../../../ui/index.js';

const conversion = utils.conversion;
const create = paletteSuperUtils.create;
const genHues = paletteSuperUtils.genHues;
const paletteRanges = consts.paletteRanges;

export async function triadic(args: PaletteGenerationArgs): Promise<Palette> {
	// ensure exactly 3 swatches
	if (args.swatches !== 3) uiFn.enforceSwatchRules(3, 3);

	// base color setup
	const baseColor = create.baseColor(args.customColor);

	// generate triadic hues
	const hues = genHues.triadic(baseColor.value.hue);

	// initialize palette items array
	const paletteItems: PaletteItem[] = [];

	// add the base color as the first palette item
	const basePaletteItem = await create.paletteItem(baseColor);
	paletteItems.push(basePaletteItem);

	// add the triadic colors sequentially
	for (let index = 0; index < hues.length; index++) {
		const hue = hues[index];
		const adjustedHSL: HSL = {
			value: {
				hue: coreUtils.brand.asRadial(hue),
				saturation: coreUtils.brand.asPercentile(
					Math.max(
						0,
						Math.min(
							baseColor.value.saturation +
								(index % 2 === 0
									? -paletteRanges.shift.triad.sat
									: paletteRanges.shift.triad.sat),
							100
						)
					)
				),
				lightness: coreUtils.brand.asPercentile(
					Math.max(
						0,
						Math.min(
							baseColor.value.lightness +
								(index % 2 === 0
									? -paletteRanges.shift.triad.light
									: paletteRanges.shift.triad.light),
							100
						)
					)
				)
			},
			format: 'hsl'
		};

		// generate all color values and create the palette item
		const adjustedColor = conversion.genAllColorValues(adjustedHSL)
			.hsl as HSL;
		const paletteItem = await create.paletteItem(adjustedColor);
		paletteItems.push(paletteItem);
	}

	const idbManager = await IDBManager.getInstance();
	const paletteID = await idbManager.getNextPaletteID();

	if (!paletteID) throw new Error('Palette ID is either null or undefined.');

	// save the palette to the database
	const triadicPalette = await idbManager.savePaletteToDB(
		'triadic',
		paletteItems,
		paletteID,
		args.swatches,
		args.limitDark,
		args.limitGray,
		args.limitLight
	);

	// handle null or undefined palette
	if (!triadicPalette) {
		throw new Error('Triadic palette is either null or undefined.');
	}

	return triadicPalette;
}
