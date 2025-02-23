// File: config/partials/env.ts

import { Environment } from '../../types/index.js';

export const env: Readonly<Environment> = {
	app: {
		historyLimit: 100,
		paletteHistoryLimit: 20
	},
	idb: {
		retryDelay: 50
	},
	mutex: {
		contentionHistoryLimit: 100,
		timeout: 5000
	},
	observer: {
		debounce: 50
	},
	state: {
		maxReadyAttempts: 20,
		maxSaveRetries: 10,
		saveThrottleDelay: 30
	}
} as const;
