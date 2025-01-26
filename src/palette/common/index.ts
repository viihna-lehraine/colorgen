// File: src/palette/common/index.js

import { paletteHelpers } from './paletteHelpers/index.js';
import { paletteSuperUtils } from './paletteSuperUtils/index.js';
import { paletteUtils } from './paletteUtils/index.js';

export { paletteHelpers, paletteSuperUtils, paletteUtils };

const helpers = paletteHelpers;
const superUtils = paletteSuperUtils;
const utils = paletteUtils;

export const paletteCommon = {
	helpers,
	superUtils,
	utils
} as const;
