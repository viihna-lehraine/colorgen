// File: common/services/AppLogger.js

import { AppLoggerInterface, MutationLog } from '../../types/index.js';
import { getCallerInfo } from './helpers.js';
import { config } from '../../config/index.js';

const mode = config.mode;
const debugLevel = mode.debugLevel;

export class AppLogger implements AppLoggerInterface {
	private static instance: AppLogger | null = null;

	private constructor() {
		console.log('[AppLogger] AppLogger constructor executed.');
	}

	public static getInstance(): AppLogger {
		console.log('[AppLogger] Executing getInstance().');

		if (!AppLogger.instance) {
			console.log(
				'[AppLogger] No instance found. Creating new instance.'
			);
			AppLogger.instance = new AppLogger();
			console.log('[AppLogger] Instance created.');
		}

		console.log('[AppLogger] Returning existing instance.');
		return AppLogger.instance;
	}

	public log(
		message: string,
		level: 'debug' | 'info' | 'warn' | 'error' = 'info',
		caller?: string
	): void {
		if (debugLevel >= 5) {
			console.log(`[AppLogger.log] Log function CALLED with:`, {
				message,
				level,
				debugLevel,
				caller
			});
		}
		this.logMessage(message, level, caller);
	}

	public logMutation(
		data: MutationLog,
		logCallback: (data: MutationLog) => void = () => {}
	): void {
		this.log(this.formatMutationLog(data), 'info');

		logCallback(data);
	}

	private logMessage(
		message: string,
		level: 'debug' | 'info' | 'warn' | 'error',
		caller?: string
	): void {
		if (level === 'info' || debugLevel < this.getDebugThreshold(level)) {
			return;
		}

		const callerInfo = caller || getCallerInfo();
		const timestamp = this.getFormattedTimestamp();

		try {
			console.log(
				`%c[${level.toUpperCase()}]%c ${timestamp} [${callerInfo}] %c${message}`,
				this.getLevelColor(level),
				'color: gray',
				'color: inherit'
			);
		} catch (error) {
			console.error(
				`AppLogger encountered an unexpected error: ${error}`
			);
		}

		if (
			callerInfo === 'Unknown caller' &&
			debugLevel > 1 &&
			mode.stackTrace
		) {
			console.trace('Full Stack Trace:');
		}
	}

	private formatMutationLog(data: MutationLog): string {
		return `Mutation logged: ${JSON.stringify(data)}`;
	}

	private getDebugThreshold(
		level: 'debug' | 'info' | 'warn' | 'error'
	): number {
		switch (level) {
			case 'debug':
				return 2;
			case 'info':
				return 1;
			case 'warn':
				return 0;
			case 'error':
				return 0;
			default:
				return 0;
		}
	}

	private getFormattedTimestamp(): string {
		return new Date().toLocaleString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
	}

	private getLevelColor(level: 'debug' | 'info' | 'warn' | 'error'): string {
		switch (level) {
			case 'debug':
				return 'color: green';
			case 'info':
				return 'color: blue';
			case 'warn':
				return 'color: orange';
			case 'error':
				return 'color: red';
			default:
				return 'color: black';
		}
	}
}
