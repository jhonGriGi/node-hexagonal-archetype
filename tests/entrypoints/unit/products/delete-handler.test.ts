import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { DeleteProductCommandHandler } from '@domain/command/delete-product/command-handler';
import { DeleteProductHandler } from '@lambda/product/delete-handler';
import type { ILogger } from '@libraries/logger';
import { repositoryMock } from './repository-mock';

const loggerMock: ILogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};

const command = new DeleteProductCommandHandler(repositoryMock);

describe('deleteProductHandler test suit', () => {
    const event: APIGatewayProxyEvent = {
        body: null,
        headers: {},
        multiValueHeaders: {},
        httpMethod: 'DELETE',
        isBase64Encoded: false,
        path: '',
        pathParameters: { id: '1' },
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        requestContext: {} as any,
        resource: '',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a success response', async () => {
        const handler = new DeleteProductHandler(command, loggerMock);

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers).toEqual({
            'Content-Type': 'application/json',
        });
        expect(repositoryMock.delete).toHaveBeenCalled();
    });

    it('should return a 400 response', async () => {
        const handler = new DeleteProductHandler(command, loggerMock);

        const response = await handler.handler(
            {} as APIGatewayProxyEvent,
            {} as Context,
        );

        expect(response.statusCode).toBe(400);
    });

    it('should return a error response', async () => {
        jest.spyOn(command, 'execute').mockImplementation(() => {
            throw new Error('error');
        });

        const handler = new DeleteProductHandler(command, loggerMock);

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeDefined();
    });
});
