import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { DeleteProductCommand } from "@domain/command/delete_product/command";
import { DeleteProductCommandHandler } from "@domain/command/delete_product/command_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";
import { DeleteProductResponse } from "@schemas/products";

export class DeleteProductHandler implements LambdaHandlerInterface {
	constructor(private readonly commandHandler: DeleteProductCommandHandler) {}

	@tracer.captureLambdaHandler()
	@logger.injectLambdaContext({ logEvent: false })
	public async handler(
		_event: AWSLambda.APIGatewayProxyEvent,
		_context: AWSLambda.Context
	): Promise<LambdaApiResponse> {
		try {
			const parsedBody = DeleteProductCommand.safeParse(JSON.parse(_event.body!));
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
				.withBody(DeleteProductResponse.safeParse({ id: commandResponse }).data!)
				.build();
		} catch (error) {
			return ApiResponseBuilder.empty()
				.withStatusCode(400)
				.withBody({ error: error instanceof Error ? error.message : "Error" })
				.build();
		}
	}
}
