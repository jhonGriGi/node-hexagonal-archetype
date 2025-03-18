import { parser } from "@aws-lambda-powertools/parser";
import { ApiGatewayEnvelope } from "@aws-lambda-powertools/parser/envelopes";
import { APIGatewayProxyEvent, ParsedResult } from "@aws-lambda-powertools/parser/types";
import ApiResponseBuilder, { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";
import { CreateProductCommandHandler } from "@domain/command/create_product/command_handler";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import LambdaLogger, { logger } from "@libraries/logger";
import { tracer } from "@libraries/tracer";
import { CreateProductDTO, CreateProductResponse, CreateProductSchema } from "@schemas/products";
import { APIGatewayEvent } from "aws-lambda";
import { build } from "esbuild";

export class CreateProductHandler implements LambdaHandlerInterface {
	constructor(private readonly commandHandler: CreateProductCommandHandler) {}

	@tracer.captureLambdaHandler()
	@logger.injectLambdaContext({ logEvent: false })
	@parser({ schema: CreateProductSchema, safeParse: true })
	public async handler(
		_event: ParsedResult<APIGatewayProxyEvent, CreateProductDTO>,
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

			const commandResponse = await this.commandHandler.execute(_event.data.body);
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
