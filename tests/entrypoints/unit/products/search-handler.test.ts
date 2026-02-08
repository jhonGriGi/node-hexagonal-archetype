import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { SearchProductQueryHandler } from '@domain/queries/search-product/query-handler';
import { SearchProductHandler } from '@lambda/product/search-handler';
import type { ILogger } from '@libraries/logger';
import { repositoryMock } from './repository-mock';

const loggerMock: ILogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};

const command = new SearchProductQueryHandler(repositoryMock);

describe('searchProductHandler test suit', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a success response from id', async () => {
        const handler = new SearchProductHandler(command, loggerMock);
        const event: APIGatewayProxyEvent = {
            body: null,
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '',
            pathParameters: { id: '1' },
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {} as any,
            resource: '',
        };

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers).toEqual({
            'Content-Type': 'application/json',
        });
        expect(repositoryMock.get).toHaveBeenCalled();
    });

    it('should return a success response', async () => {
        const handler = new SearchProductHandler(command, loggerMock);
        const event: APIGatewayProxyEvent = {
            body: null,
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '',
            pathParameters: {},
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {} as any,
            resource: '',
        };

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers).toEqual({
            'Content-Type': 'application/json',
        });
    });

    it('should return error when handler fails', async () => {
        const handler = new SearchProductHandler(command, loggerMock);
        jest.spyOn(command, 'execute').mockRejectedValue(new Error('test error'));
        const event: APIGatewayProxyEvent = {
            body: null,
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '',
            pathParameters: { id: '1' },
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {} as any,
            resource: '',
        };

        const response = await handler.handler(event, {} as Context);

        expect(response.statusCode).toBe(400);
    });
});
