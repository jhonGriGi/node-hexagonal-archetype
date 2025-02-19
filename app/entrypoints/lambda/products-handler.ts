import { MetricUnit } from '@aws-lambda-powertools/metrics'
import ApiResponseBuilder, { LambdaApiResponse } from '@domain/Builders/ApiResponseBuilder'
import LambdaHandlerInterface from '@libraries/lambda-handler-interface'
import LambdaLogger, { logger } from '@libraries/logger'
import { LambdaMetrics } from '@libraries/metrics'
import { LambdaTracer, tracer } from '@libraries/tracer'

class Lambda implements LambdaHandlerInterface {
  @tracer.captureLambdaHandler()
  @logger.injectLambdaContext({ logEvent: false })
  public async handler (_event: unknown, _context: unknown): Promise<LambdaApiResponse> {
    LambdaMetrics.addMetric('successfulBooking', MetricUnit.Count, 1)
    LambdaLogger.info('this is an example of static logger', {
      event: _event,
      context: _context
    })
    LambdaTracer.getSegment()

    return ApiResponseBuilder
      .empty()
      .withStatusCode(200)
      .withHeaders({ 'Content-Type': 'application/json' })
      .withBody({
        Hello: 'World'
      })
      .build()
  }
}

export const handlerClass = new Lambda()
