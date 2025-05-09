import { parser } from '@aws-lambda-powertools/parser';
import {
  APIGatewayProxyEvent,
  ParsedResult,
} from '@aws-lambda-powertools/parser/types';
import ApiResponseBuilder, {
  LambdaApiResponse,
} from '@domain/builders/ApiResponseBuilder';
import { SearchProductQueryHandler } from '@domain/queries/search_product/query_handler';
import LambdaHandlerInterface from '@libraries/lambda-handler-interface';
import LambdaLogger, { logger } from '@libraries/logger';
import { tracer } from '@libraries/tracer';
import { GetProductDTO, GetProductSchema } from '@schemas/products';

export class SearchProductHandler implements LambdaHandlerInterface {
  constructor(private readonly commandHandler: SearchProductQueryHandler) {}

  @tracer.captureLambdaHandler()
  @logger.injectLambdaContext({ logEvent: false })
  @parser({ schema: GetProductSchema, safeParse: true })
  public async handler(
    _event: ParsedResult<APIGatewayProxyEvent, GetProductDTO>,
    _context: AWSLambda.Context
  ): Promise<LambdaApiResponse> {
    logger.info('context', { _context });
    try {
      if (!_event.success) {
        return ApiResponseBuilder.empty()
          .withStatusCode(400)
          .withHeaders({ 'Content-Type': 'application/json' })
          .withBody(_event)
          .build();
      }

      const commandResponse = await this.commandHandler.execute(
        _event.data.pathParameters!
      );

      if (typeof commandResponse === null) {
        return ApiResponseBuilder.empty()
          .withStatusCode(404)
          .withHeaders({ 'Content-Type': 'application/json' })
          .build();
      }

      return ApiResponseBuilder.empty()
        .withStatusCode(200)
        .withHeaders({ 'Content-Type': 'application/json' })
        .withBody(commandResponse)
        .build();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error';
      LambdaLogger.error(errorMessage);

      return ApiResponseBuilder.empty()
        .withStatusCode(400)
        .withBody({ error: errorMessage })
        .build();
    }
  }
}
