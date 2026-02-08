import type { ILogger } from '@libraries/logger';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { UpdateProductCommandHandler } from '@domain/command/update-product/command-handler';
import { UpdateProductHandler } from '@lambda/product/update-handler';
import { repositoryMock } from './repository-mock';

const loggerMock: ILogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};

const command = new UpdateProductCommandHandler(repositoryMock);

describe('updateProductHandler test suit', () => {
    const event: APIGatewayProxyEvent = {
        body: JSON.stringify({
            id: '1',
            name: 'mock name',
            description: 'mock description',
        }),
        headers: {},
        multiValueHeaders: {},
        httpMethod: 'PUT',
        isBase64Encoded: false,
        path: '',
        pathParameters: null,
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
        const handler = new UpdateProductHandler(command, loggerMock);

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers).toEqual({
            'Content-Type': 'application/json',
        });
        expect(repositoryMock.updateAttributes).toHaveBeenCalled();
    });

    it('should return a 400 response', async () => {
        const handler = new UpdateProductHandler(command, loggerMock);

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

        const handler = new UpdateProductHandler(command, loggerMock);

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeDefined();
    });
});
