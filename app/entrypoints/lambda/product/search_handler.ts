import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { SearchProductCommand } from "@domain/command/search_product/command";
import { SearchProductCommandHandler } from "@domain/command/search_product/command_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";

export class SearchProductHandler implements LambdaHandlerInterface {
	constructor(private readonly getProductCommand: SearchProductCommandHandler) {}

	@tracer.captureLambdaHandler()
	@logger.injectLambdaContext({ logEvent: false })
	public async handler(
		_event: AWSLambda.APIGatewayProxyEvent,
		_context: AWSLambda.Context
	): Promise<LambdaApiResponse> {
		const parsedBody = SearchProductCommand.safeParse(_event.pathParameters);

		const products = await this.getProductCommand.execute(parsedBody.data!);

		if (typeof products === null) {
			return ApiResponseBuilder.empty()
				.withStatusCode(404)
				.withHeaders({ "Content-Type": "application/json" })
				.build();
		}

		return ApiResponseBuilder.empty()
			.withStatusCode(200)
			.withHeaders({ "Content-Type": "application/json" })
			.withBody({ products })
			.build();
	}
}
