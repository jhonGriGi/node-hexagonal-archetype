import { InMemoryRepository } from '@adapters/in-memory-repository';
import { CreateProductCommandHandler } from '@domain/command/create-product/command-handler';
import { DeleteProductCommandHandler } from '@domain/command/delete-product/command-handler';
import { UpdateProductCommandHandler } from '@domain/command/update-product/command-handler';
import { SearchProductQueryHandler } from '@domain/queries/search-product/query-handler';
import { CreateProductHandler } from '@lambda/product/create-handler';
import { DeleteProductHandler } from '@lambda/product/delete-handler';
import { SearchProductHandler } from '@lambda/product/search-handler';
import { UpdateProductHandler } from '@lambda/product/update-handler';
import { PinoLogger, LoggerProxy } from '@libraries/logger';
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

const repository = new InMemoryRepository();
const pinoLogger = new PinoLogger();
const logger = new LoggerProxy(pinoLogger);

export const postProductsHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const commandHandler = new CreateProductCommandHandler(repository);
    const handler = new CreateProductHandler(commandHandler, logger);
    return await handler.handler(event, context);
};

export const deleteProductsHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const commandHandler = new DeleteProductCommandHandler(repository);
    const handler = new DeleteProductHandler(commandHandler, logger);
    return await handler.handler(event, context);
};

export const putProductsHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const commandHandler = new UpdateProductCommandHandler(repository);
    const handler = new UpdateProductHandler(commandHandler, logger);
    return await handler.handler(event, context);
};

export const getProductsHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const queryHandler = new SearchProductQueryHandler(repository);
    const handler = new SearchProductHandler(queryHandler, logger);
    return await handler.handler(event, context);
};
