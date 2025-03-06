import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { UpdateProductCommand } from "@domain/command/update_product/command";
import { UpdateProductCommandHandler } from "@domain/command/update_product/command_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";
import { UpdateProductResponse } from "@schemas/products";

export class UpdateProductHandler implements LambdaHandlerInterface {
	constructor(private readonly commandHandler: UpdateProductCommandHandler) {}

	@tracer.captureLambdaHandler()
	@logger.injectLambdaContext({ logEvent: false })
	public async handler(
		_event: AWSLambda.APIGatewayProxyEvent,
		_context: AWSLambda.Context
	): Promise<LambdaApiResponse> {
		try {
			const parsedBody = UpdateProductCommand.safeParse(JSON.parse(_event.body!));
			if (!parsedBody.success) {
				return ApiResponseBuilder.empty()
					.withStatusCode(400)
					.withBody({ errors: parsedBody.error.errors })
					.build();
			}
			const commandResponse = await this.commandHandler.execute(parsedBody.data);
			return ApiResponseBuilder.empty()
				.withStatusCode(200)
				.withHeaders({ "Content-Type": "application/json" })
				.withBody(
					UpdateProductResponse.safeParse({
						id: commandResponse,
					}).data!
				)
				.build();
		} catch (error) {
			return ApiResponseBuilder.empty()
				.withStatusCode(400)
				.withBody({ error: error instanceof Error ? error.message : "Error" })
				.build();
		}
	}
}
