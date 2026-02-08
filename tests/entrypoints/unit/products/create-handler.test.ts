import type { ILogger } from '@libraries/logger';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { CreateProductCommandHandler } from '@domain/command/create-product/command-handler';
import { CreateProductHandler } from '@lambda/product/create-handler';
import { repositoryMock } from './repository-mock';

const loggerMock: ILogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};

const command = new CreateProductCommandHandler(repositoryMock);

describe('createProductHandler test suit', () => {
    const event: APIGatewayProxyEvent = {
        body: JSON.stringify({
            name: 'mock name',
            description: 'mock description',
        }),
        headers: {},
        multiValueHeaders: {},
        httpMethod: 'POST',
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
        const handler = new CreateProductHandler(command, loggerMock);

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers).toEqual({
            'Content-Type': 'application/json',
        });
        expect(repositoryMock.add).toHaveBeenCalled();
    });

    it('should return a 400 response', async () => {
        const handler = new CreateProductHandler(command, loggerMock);

        const response = await handler.handler(
            { ...event, body: 'invalid' } as APIGatewayProxyEvent,
            {} as Context,
        );

        expect(response.statusCode).toBe(400);
    });

    it('should return a error response', async () => {
        jest.spyOn(command, 'execute').mockImplementation(() => {
            throw new Error('error');
        });

        const handler = new CreateProductHandler(command, loggerMock);

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(400);
        expect(response.body).toBeDefined();
    });
});
