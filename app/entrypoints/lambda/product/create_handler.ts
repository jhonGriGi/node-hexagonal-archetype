import { APIGatewayProxyEvent } from "@aws-lambda-powertools/parser/types";
import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { CreateProductCommandHandler } from "@domain/command/create_product/command_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import LambdaLogger, { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";
import { CreateProductDTO, CreateProductResponse, CreateProductSchema } from "@schemas/products";
import { ApiGatewayEnvelope } from "@aws-lambda-powertools/parser/envelopes";

export class CreateProductHandler implements LambdaHandlerInterface {
	constructor(private readonly commandHandler: CreateProductCommandHandler) {}

	@tracer.captureLambdaHandler()
	@logger.injectLambdaContext({ logEvent: false })
	public async handler(
		_event: APIGatewayProxyEvent,
		_context: AWSLambda.Context
	): Promise<LambdaApiResponse> {
		try {
			const event = { ..._event, body: JSON.parse(_event.body!) };
			const createProductParsed: CreateProductDTO = ApiGatewayEnvelope.parse(event, CreateProductSchema);
            if (!createProductParsed) {
                return ApiResponseBuilder.empty()
                    .withStatusCode(400)
                    .withHeaders({ "Content-Type": "application/json" })
                    .withBody(createProductParsed)
                    .build();
            }

			const commandResponse = await this.commandHandler.execute(createProductParsed);
			return ApiResponseBuilder.empty()
				.withStatusCode(200)
				.withHeaders({ "Content-Type": "application/json" })
				.withBody<CreateProductResponse>({
					id: commandResponse,
				})
				.build();
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : "Error";
			LambdaLogger.error(errorMessage);

			return ApiResponseBuilder.empty()
				.withStatusCode(400)
				.withBody({ error: errorMessage })
				.build();
		}
	}
}
