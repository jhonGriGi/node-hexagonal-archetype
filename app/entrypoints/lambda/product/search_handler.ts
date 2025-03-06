import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { SearchProductCommand } from "@domain/command/search_product/command";
import { SearchProductCommandHandler } from "@domain/command/search_product/command_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";
import { GetAllProductsResponse, GetProductsResponse } from "@schemas/products";

export class SearchProductHandler implements LambdaHandlerInterface {
	constructor(private readonly commandHandler: SearchProductCommandHandler) {}

	@tracer.captureLambdaHandler()
	@logger.injectLambdaContext({ logEvent: false })
	public async handler(
		_event: AWSLambda.APIGatewayProxyEvent,
		_context: AWSLambda.Context
	): Promise<LambdaApiResponse> {
		const parsedBody = SearchProductCommand.safeParse(_event.pathParameters).data;

		const commandResponse = await this.commandHandler.execute({
			id: parsedBody?.id,
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
	}
}
