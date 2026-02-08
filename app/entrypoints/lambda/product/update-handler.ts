import type { LambdaApiResponse } from '@domain/builders/api-response-builder';
import type { UpdateProductCommandHandler } from '@domain/command/update-product/command-handler';
import type { ILogger } from '@libraries/logger';
import type { UpdateProductResponse } from '@schemas/products';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import ApiResponseBuilder from '@domain/builders/api-response-builder';
import { UpdateProductSchema } from '@schemas/products';

export class UpdateProductHandler {
    constructor(
        private readonly commandHandler: UpdateProductCommandHandler,
        private readonly logger: ILogger,
    ) {}

    public async handler(
        _event: APIGatewayProxyEvent,
        _context: Context,
    ): Promise<LambdaApiResponse> {
        this.logger.info('context', { _context });
        try {
            const event = { ..._event, body: JSON.parse(_event.body!) };
            const updateProductParsed = UpdateProductSchema.safeParse(event);
            if (!updateProductParsed.success) {
                return ApiResponseBuilder.empty()
                    .withStatusCode(400)
                    .withHeaders({ 'Content-Type': 'application/json' })
                    .withBody(updateProductParsed)
                    .build();
            }
            const commandResponse = await this.commandHandler.execute(updateProductParsed.data.body);
            return ApiResponseBuilder.empty()
                .withStatusCode(200)
                .withHeaders({ 'Content-Type': 'application/json' })
                .withBody<UpdateProductResponse>({ id: commandResponse })
                .build();
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error';
            this.logger.error(errorMessage);

            return ApiResponseBuilder.empty()
                .withStatusCode(400)
                .withBody({ error: errorMessage })
                .build();
        }
    }
}
