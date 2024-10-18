import type { LambdaInterface } from '@aws-lambda-powertools/commons/types';
import tracer from '../../libraries/tracer';
import LambdaLogger, { logger } from '../../libraries/logger';

class Lambda implements LambdaInterface {
    @tracer.captureLambdaHandler()
    // In logger the { logEvent: true } is disabled by default to prevent sensitive info being logged
    @logger.injectLambdaContext({ logEvent: false })
    public async handler(_event: unknown, _context: unknown): Promise<{ status: number; body: unknown }> {
        LambdaLogger.info('this is an example of static logger', {
            event: _event,
            context: _context,
        });
        tracer.getSegment();

        return {
            status: 200,
            body: JSON.stringify({
                Hello: 'World',
            }),
        };
    }
}

export const handlerClass = new Lambda();
