import { parser } from "@aws-lambda-powertools/parser";
import { APIGatewayProxyEvent, ParsedResult } from "@aws-lambda-powertools/parser/types";
import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { DeleteProductCommandHandler } from "@domain/command/delete_product/command_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import LambdaLogger, { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";
import { DeleteProductDTO, DeleteProductResponse, DeleteProductSchema } from "@schemas/products";

export class DeleteProductHandler implements LambdaHandlerInterface {
	constructor(private readonly commandHandler: DeleteProductCommandHandler) {}

	@tracer.captureLambdaHandler()
	@logger.injectLambdaContext({ logEvent: false })
	@parser({ schema: DeleteProductSchema, safeParse: true })
	public async handler(
		_event: ParsedResult<APIGatewayProxyEvent, DeleteProductDTO>,
		_context: AWSLambda.Context
	): Promise<LambdaApiResponse> {
		try {
			if (!_event.success) {
				return ApiResponseBuilder.empty()
					.withStatusCode(400)
					.withHeaders({ "Content-Type": "application/json" })
					.withBody(_event)
					.build();
			}
			const commandResponse = await this.commandHandler.execute(_event.data.pathParameters);
			return ApiResponseBuilder.empty()
				.withStatusCode(200)
				.withHeaders({ "Content-Type": "application/json" })
				.withBody<DeleteProductResponse>({ id: commandResponse })
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
