// File: File: common/helpers/math.ts

import { MathHelpers, NumericRangeKey } from '../../types/index.js';
import { config } from '../../config/index.js';

const sets = config.sets;

export const mathHelpersFactory = (): MathHelpers =>
	({
		clampToRange(value: number, rangeKey: NumericRangeKey): number {
			const [min, max] = sets[rangeKey];

			return Math.min(Math.max(value, min), max);
		}
	}) as const;
