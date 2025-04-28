import {
  APIGatewayProxyEvent,
  ParsedResult,
} from '@aws-lambda-powertools/parser/types';
import { DeleteProductCommandHandler } from '@domain/command/delete_product/command_handler';
import { DeleteProductHandler } from '@lambda/product/delete_handler';
import { DeleteProductDTO } from '@schemas/products';
import { Context } from 'aws-lambda';

import { repositoryMock } from './repository_mock';

const command = new DeleteProductCommandHandler(repositoryMock);

describe('DeleteProductHandler test suit', () => {
  const event: DeleteProductDTO = {
    path: '',
    pathParameters: {
      id: '1',
    },
    resource: '',
    httpMethod: 'GET',
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    requestContext: {
      path: '',
      httpMethod: 'GET',
      accountId: '',
      apiId: '',
      stage: '',
      protocol: '',
      identity: {
        accessKey: undefined,
        accountId: undefined,
        apiKey: undefined,
        apiKeyId: undefined,
        caller: undefined,
        cognitoAuthenticationProvider: undefined,
        cognitoAuthenticationType: undefined,
        cognitoIdentityId: undefined,
        cognitoIdentityPoolId: undefined,
        principalOrgId: undefined,
        sourceIp: undefined,
        user: undefined,
        userAgent: undefined,
        userArn: undefined,
        clientCert: undefined,
      },
      requestId: '',
      requestTime: '',
      requestTimeEpoch: 0,
      resourcePath: '',
      deploymentId: undefined,
      authorizer: undefined,
      resourceId: undefined,
      domainName: undefined,
      domainPrefix: undefined,
      extendedRequestId: undefined,
      connectedAt: undefined,
      connectionId: undefined,
      eventType: undefined,
      messageDirection: undefined,
      messageId: undefined,
      routeKey: undefined,
      operationName: undefined,
    },
    body: null,
    isBase64Encoded: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response', async () => {
    const handler = new DeleteProductHandler(command);

    const response = await handler.handler(
      event as unknown as ParsedResult<APIGatewayProxyEvent, DeleteProductDTO>,
      {} as Context
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(repositoryMock.delete).toHaveBeenCalled();
  });

  it('should return a 400 response', async () => {
    const handler = new DeleteProductHandler(command);

    const response = await handler.handler(
      {} as APIGatewayProxyEvent,
      {} as Context
    );

    expect(response.statusCode).toBe(400);
  });

  it('should return a error response', async () => {
    jest.spyOn(command, 'execute').mockImplementation(() => {
      throw new Error();
    });

    const handler = new DeleteProductHandler(command);

    const response = await handler.handler(
      event as unknown as ParsedResult<APIGatewayProxyEvent, DeleteProductDTO>,
      {} as Context
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
  });
});
