import { PinoLogger, LoggerProxy } from '@libraries/logger';

describe('Logger test suite', () => {
    describe('PinoLogger', () => {
        let logger: PinoLogger;

        beforeEach(() => {
            logger = new PinoLogger();
        });

        it('should log info', () => {
            expect(() => logger.info('test message')).not.toThrow();
        });

        it('should log warn', () => {
            expect(() => logger.warn('test warning')).not.toThrow();
        });

        it('should log error', () => {
            expect(() => logger.error('test error')).not.toThrow();
        });

        it('should log debug', () => {
            expect(() => logger.debug('test debug')).not.toThrow();
        });
    });

    describe('LoggerProxy', () => {
        let mockLogger: any;
        let proxy: LoggerProxy;

        beforeEach(() => {
            mockLogger = {
                info: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
                debug: jest.fn(),
            };
            proxy = new LoggerProxy(mockLogger);
        });

        it('should add context to logs', () => {
            proxy.setContext('requestId', '123');
            proxy.info('test');

            expect(mockLogger.info).toHaveBeenCalledWith('test', { requestId: '123' });
        });

        it('should merge context with metadata', () => {
            proxy.setContext('requestId', '123');
            proxy.info('test', { userId: '456' });

            expect(mockLogger.info).toHaveBeenCalledWith('test', {
                requestId: '123',
                userId: '456',
            });
        });

        it('should clear context', () => {
            proxy.setContext('requestId', '123');
            proxy.clearContext();
            proxy.info('test');

            expect(mockLogger.info).toHaveBeenCalledWith('test', {});
        });

        it('should proxy warn', () => {
            proxy.warn('warning');
            expect(mockLogger.warn).toHaveBeenCalledWith('warning', {});
        });

        it('should proxy error', () => {
            proxy.error('error');
            expect(mockLogger.error).toHaveBeenCalledWith('error', {});
        });

        it('should proxy debug', () => {
            proxy.debug('debug');
            expect(mockLogger.debug).toHaveBeenCalledWith('debug', {});
        });
    });
});
