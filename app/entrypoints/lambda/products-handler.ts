import { MetricUnit } from '@aws-lambda-powertools/metrics';
import LambdaHandlerInterface, { LambdaApiResponse } from '@libraries/lambda-handler-interface';
import LambdaLogger, { logger } from '@libraries/logger';
import tracer from '@libraries/tracer';
import metrics from '@libraries/metrics';

// TODO: Add api models, lambda handlers methods and middlewares?
class Lambda implements LambdaHandlerInterface {
    @tracer.captureLambdaHandler()
    @logger.injectLambdaContext({ logEvent: false })
    public async handler(_event: unknown, _context: unknown): Promise<LambdaApiResponse> {
        metrics.addMetric('successfulBooking', MetricUnit.Count, 1);
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
