import { CreateProductCommandHandler } from "@domain/command/create_product/command_handler";
import { CreateProductHandler } from "@lambda/product/create_handler";
import { repositoryMock } from "./repository_mock";
import { Context } from "aws-lambda";
import { CreateProductDTO } from "@schemas/products";
import { readFile } from "fs/promises";
import path from "path";
import { APIGatewayProxyEvent, ParsedResult } from "@aws-lambda-powertools/parser/types";

const command = new CreateProductCommandHandler(repositoryMock);

describe("CreateProductHandler test suit", () => {
	const event: CreateProductDTO = {
		path: "",
		body: {
			name: "mock name",
			description: "mock description",
		},
		resource: "",
		httpMethod: "GET",
		queryStringParameters: null,
		multiValueQueryStringParameters: null,
		requestContext: {
			path: "",
			httpMethod: "GET",
			accountId: "",
			apiId: "",
			stage: "",
			protocol: "",
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
			requestId: "",
			requestTime: "",
			requestTimeEpoch: 0,
			resourcePath: "",
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
		isBase64Encoded: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a success response", async () => {
		const handler = new CreateProductHandler(command);

		const response = await handler.handler(
			event as unknown as ParsedResult<APIGatewayProxyEvent, CreateProductDTO>,
			{} as Context
		);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers).toEqual({ "Content-Type": "application/json" });
		expect(repositoryMock.add).toHaveBeenCalled();
	});

	it("should return a 400 response", async () => {
		const handler = new CreateProductHandler(command);

		const response = await handler.handler({} as any, {} as Context);

		expect(response.statusCode).toBe(400);
	});

	it("should return a error response", async () => {
		jest.spyOn(command, "execute").mockImplementation(() => {
			throw new Error();
		});

		const handler = new CreateProductHandler(command);

		const response = await handler.handler(
			event as unknown as ParsedResult<APIGatewayProxyEvent, CreateProductDTO>,
			{} as Context
		);

		expect(response.statusCode).toBe(400);
		expect(response.body).toBeDefined();
	});
});
