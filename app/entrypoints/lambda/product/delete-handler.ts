import type { LambdaApiResponse } from '@domain/builders/api-response-builder';
import type { DeleteProductCommandHandler } from '@domain/command/delete-product/command-handler';
import type { DeleteProductResponse } from '@schemas/products';
import type { ILogger } from '@libraries/logger';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import ApiResponseBuilder from '@domain/builders/api-response-builder';
import { DeleteProductSchema } from '@schemas/products';

export class DeleteProductHandler {
    constructor(
        private readonly commandHandler: DeleteProductCommandHandler,
        private readonly logger: ILogger,
    ) {}

    public async handler(
        _event: APIGatewayProxyEvent,
        _context: Context,
    ): Promise<LambdaApiResponse> {
        this.logger.info('context', { _context });
        try {
            const parsed = DeleteProductSchema.safeParse(_event);
            if (!parsed.success) {
                return ApiResponseBuilder.empty()
                    .withStatusCode(400)
                    .withHeaders({ 'Content-Type': 'application/json' })
                    .withBody(parsed)
                    .build();
            }
            const commandResponse = await this.commandHandler.execute(parsed.data.pathParameters);
            return ApiResponseBuilder.empty()
                .withStatusCode(200)
                .withHeaders({ 'Content-Type': 'application/json' })
                .withBody<DeleteProductResponse>({ id: commandResponse })
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
