import pino from 'pino';

export interface ILogger {
    info: (message: string, metadata?: Record<string, unknown>) => void;
    warn: (message: string, metadata?: Record<string, unknown>) => void;
    error: (message: string, metadata?: Record<string, unknown>) => void;
    debug: (message: string, metadata?: Record<string, unknown>) => void;
}

export class PinoLogger implements ILogger {
    private logger: pino.Logger;

    constructor() {
        this.logger = pino({
            level: process.env.LOG_LEVEL || 'info',
        });
    }

    info(message: string, metadata?: Record<string, unknown>): void {
        this.logger.info(metadata || {}, message);
    }

    warn(message: string, metadata?: Record<string, unknown>): void {
        this.logger.warn(metadata || {}, message);
    }

    error(message: string, metadata?: Record<string, unknown>): void {
        this.logger.error(metadata || {}, message);
    }

    debug(message: string, metadata?: Record<string, unknown>): void {
        this.logger.debug(metadata || {}, message);
    }
}

export class LoggerProxy implements ILogger {
    private context: Record<string, any> = {};

    constructor(private target: ILogger) {}

    setContext(key: string, value: any): void {
        this.context[key] = value;
    }

    clearContext(): void {
        this.context = {};
    }

    info(message: string, metadata?: Record<string, unknown>): void {
        this.target.info(message, { ...this.context, ...metadata });
    }

    warn(message: string, metadata?: Record<string, unknown>): void {
        this.target.warn(message, { ...this.context, ...metadata });
    }

    error(message: string, metadata?: Record<string, unknown>): void {
        this.target.error(message, { ...this.context, ...metadata });
    }

    debug(message: string, metadata?: Record<string, unknown>): void {
        this.target.debug(message, { ...this.context, ...metadata });
    }
}
