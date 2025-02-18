import { data } from '../../data/index.js';

// File: common/services/ErrorHandler.js
const mode = data.mode;
const debugLevel = mode.debugLevel;
class ErrorHandler {
    static instance = null;
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    static getInstance(logger) {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler(logger);
        }
        return ErrorHandler.instance;
    }
    handle(error, errorMessage, caller, context = {}, severity = 'error') {
        const formattedError = this.formatError(error, errorMessage, context);
        this.logger.log(formattedError, severity, debugLevel, caller);
        {
            this.logger.log(`Stack trace:\N${this.getStackTrace()}`, 'debug', 3, '[ErrorHandler]');
        }
    }
    async handleAsync(action, errorMessage, caller = 'Unknown caller', context) {
        try {
            return await action();
        }
        catch (error) {
            this.handle(error, errorMessage, caller, context);
            return null;
        }
    }
    formatError(error, message, context) {
        return error instanceof Error
            ? `${message}: ${error.message}. Context: ${JSON.stringify(context)}`
            : `${message}: ${error}. Context: ${JSON.stringify(context)}`;
    }
    getStackTrace() {
        try {
            throw new Error();
        }
        catch (e) {
            return e.stack ?? 'No stack trace available';
        }
    }
}

export { ErrorHandler };
//# sourceMappingURL=ErrorHandler.js.map
