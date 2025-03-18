import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { SearchProductQuery } from "@domain/queries/search_product/query";
import { SearchProductQueryHandler } from "@domain/queries/search_product/query_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import LambdaLogger, { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";
import { GetAllProductsResponse, GetProductsResponse } from "@schemas/products";

export class SearchProductHandler implements LambdaHandlerInterface {
  constructor(private readonly commandHandler: SearchProductQueryHandler) {
  }

  @tracer.captureLambdaHandler()
  @logger.injectLambdaContext({ logEvent: false })
  public async handler(
    _event: AWSLambda.APIGatewayProxyEvent,
    _context: AWSLambda.Context
  ): Promise<LambdaApiResponse> {
    try {
      const parsedBody = SearchProductQuery.safeParse(_event.pathParameters).data;

      const commandResponse = await this.commandHandler.execute({
        id: parsedBody?.id
      });

      if (typeof commandResponse === null) {
        return ApiResponseBuilder.empty()
          .withStatusCode(404)
          .withHeaders({ "Content-Type": "application/json" })
          .build();
      }

      const products = Array.isArray(commandResponse)
        ? GetAllProductsResponse.safeParse(commandResponse).data
        : GetProductsResponse.safeParse(commandResponse).data;

      return ApiResponseBuilder.empty()
        .withStatusCode(200)
        .withHeaders({ "Content-Type": "application/json" })
        .withBody(Array.isArray(products) ? [...products] : { ...products })
        .build();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error";
      LambdaLogger.error(errorMessage);

      return ApiResponseBuilder.empty()
        .withStatusCode(400)
        .withBody({ error: errorMessage })
        .build();
    }
  }
}
