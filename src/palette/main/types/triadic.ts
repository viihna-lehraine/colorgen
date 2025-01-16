// File: src/palette/main/types/triadic.js

import {
	GenPaletteArgs,
	HSL,
	Palette,
	PaletteItem
} from '../../../index/index.js';
import { core, utils } from '../../../common/index.js';
import { data } from '../../../data/index.js';
import { IDBManager } from '../../../classes/idb/index.js';
import { paletteSuperUtils } from '../../common/index.js';
import { ui } from '../../../ui/index.js';

const conversion = utils.conversion;
const create = paletteSuperUtils.create;
const genHues = paletteSuperUtils.genHues;
const paletteRanges = data.consts.paletteRanges;

const idb = IDBManager.getInstance();

export async function triadic(args: GenPaletteArgs): Promise<Palette> {
	// ensure exactly 3 swatches
	if (args.numBoxes < 3) {
		ui.enforceSwatchRules(3, 3);
	}

	// base color setup
	const baseColor = create.baseColor(args.customColor, args.enableAlpha);

	// generate triadic hues
	const hues = genHues.triadic(baseColor.value.hue);

	// initialize palette items array
	const paletteItems: PaletteItem[] = [];

	// add the base color as the first palette item
	const basePaletteItem = await create.paletteItem(
		baseColor,
		args.enableAlpha
	);
	paletteItems.push(basePaletteItem);

	// add the triadic colors sequentially
	for (let index = 0; index < hues.length; index++) {
		const hue = hues[index];
		const adjustedHSL: HSL = {
			value: {
				hue: core.brand.asRadial(hue),
				saturation: core.brand.asPercentile(
					Math.max(
						0,
						Math.min(
							baseColor.value.saturation +
								(index % 2 === 0
									? -paletteRanges.triad.satShift
									: paletteRanges.triad.satShift),
							100
						)
					)
				),
				lightness: core.brand.asPercentile(
					Math.max(
						0,
						Math.min(
							baseColor.value.lightness +
								(index % 2 === 0
									? -paletteRanges.triad.lightShift
									: paletteRanges.triad.lightShift),
							100
						)
					)
				),
				alpha: args.enableAlpha
					? core.brand.asAlphaRange(Math.random())
					: core.brand.asAlphaRange(1)
			},
			format: 'hsl'
		};

		// generate all color values and create the palette item
		const adjustedColor = conversion.genAllColorValues(adjustedHSL)
			.hsl as HSL;
		const paletteItem = await create.paletteItem(
			adjustedColor,
			args.enableAlpha
		);
		paletteItems.push(paletteItem);
	}

	// save the palette to the database
	const triadicPalette = await idb.savePaletteToDB(
		'triadic',
		paletteItems,
		baseColor,
		args.numBoxes,
		args.enableAlpha,
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
