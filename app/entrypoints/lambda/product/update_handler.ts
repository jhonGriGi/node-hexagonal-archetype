import type { APIGatewayProxyEvent } from '@aws-lambda-powertools/parser/types';
import type {
    LambdaApiResponse,
} from '@domain/builders/ApiResponseBuilder';
import type { UpdateProductCommandHandler } from '@domain/command/update_product/command_handler';
import type LambdaHandlerInterface from '@libraries/lambda-handler-interface';
import type {
    UpdateProductDTO,
    UpdateProductResponse,
} from '@schemas/products';
import { ApiGatewayEnvelope } from '@aws-lambda-powertools/parser/envelopes';
import ApiResponseBuilder from '@domain/builders/ApiResponseBuilder';
import LambdaLogger, { logger } from '@libraries/logger';
import { tracer } from '@libraries/tracer';
import {
    UpdateProductSchema,
} from '@schemas/products';

export class UpdateProductHandler implements LambdaHandlerInterface {
    constructor(private readonly commandHandler: UpdateProductCommandHandler) {}

    @tracer.captureLambdaHandler()
    @logger.injectLambdaContext({ logEvent: false })
    public async handler(
        _event: APIGatewayProxyEvent,
        _context: AWSLambda.Context,
    ): Promise<LambdaApiResponse> {
        logger.info('context', { _context });
        try {
            const event = { ..._event, body: JSON.parse(_event.body!) };
            const updateProductParsed: UpdateProductDTO = ApiGatewayEnvelope.parse(
                event,
                UpdateProductSchema,
            );
            const commandResponse
        = await this.commandHandler.execute(updateProductParsed);
            return ApiResponseBuilder.empty()
                .withStatusCode(200)
                .withHeaders({ 'Content-Type': 'application/json' })
                .withBody<UpdateProductResponse>({
                    id: commandResponse,
                })
                .build();
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error';
            LambdaLogger.error(errorMessage);

            return ApiResponseBuilder.empty()
                .withStatusCode(400)
                .withBody({ error: errorMessage })
                .build();
        }
    }
}
