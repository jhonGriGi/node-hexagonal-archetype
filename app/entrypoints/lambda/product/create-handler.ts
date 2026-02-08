import type { CreateProductCommandHandler } from '@domain/command/create-product/command-handler';
import type { ILogger } from '@libraries/logger';
import {
    CreateProductDTO,
    CreateProductResponse,
} from '@schemas/products';
import { CreateProductSchema } from '@schemas/products';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import LambdaResponseBuilder, { LambdaApiResponse } from '@domain/builders/api-response-builder';

export class CreateProductHandler {
    constructor(
        private readonly commandHandler: CreateProductCommandHandler,
        private readonly logger: ILogger,
    ) {}

    public async handler(
        _event: APIGatewayProxyEvent,
        _context: Context,
    ): Promise<LambdaApiResponse> {
        this.logger.info('start execution', { event: _event, context: _context });
        try {
            const event = { ..._event, body: JSON.parse(_event.body!) };
            const createProductParsed = CreateProductSchema.safeParse(event.body);
            if (!createProductParsed.success) {
                return LambdaResponseBuilder.empty()
                    .withStatusCode(400)
                    .withHeaders({ 'Content-Type': 'application/json' })
                    .withBody(createProductParsed)
                    .build();
            }

            const commandResponse = await this.commandHandler.execute(createProductParsed.data);
            return LambdaResponseBuilder.empty()
                .withStatusCode(200)
                .withHeaders({ 'Content-Type': 'application/json' })
                .withBody<CreateProductResponse>({
                    id: commandResponse,
                })
                .build();
        }
        catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error';
            this.logger.error(errorMessage);

            return LambdaResponseBuilder.empty()
                .withStatusCode(400)
                .withBody({ error: errorMessage })
                .build();
        }
    }
}
