import { APIGatewayProxyEvent, ParsedResult } from "@aws-lambda-powertools/parser/types";
import { SearchProductQueryHandler } from "@domain/queries/search_product/query_handler";
import { SearchProductHandler } from "@lambda/product/search_handler";
import { GetProductDTO } from "@schemas/products";
import { Context } from "aws-lambda";
import { repositoryMock } from "./repository_mock";

const command = new SearchProductQueryHandler(repositoryMock);

describe("SearchProductHandler test suit", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a success response from id", async () => {
		const handler = new SearchProductHandler(command);
		const event: GetProductDTO = {
			path: "",
			pathParameters: {
				id: "1",
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
			body: null,
			isBase64Encoded: false,
		};

		const response = await handler.handler(
			event as unknown as ParsedResult<APIGatewayProxyEvent, GetProductDTO>,
			{} as Context
		);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers).toEqual({ "Content-Type": "application/json" });
		expect(repositoryMock.get).toHaveBeenCalled();
	});

	it("should return a success response", async () => {
		const handler = new SearchProductHandler(command);
		const event: GetProductDTO = {
			path: "",
			pathParameters: {},
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
			body: null,
			isBase64Encoded: false,
		};

		const response = await handler.handler(
			event as unknown as ParsedResult<APIGatewayProxyEvent, GetProductDTO>,
			{} as Context
		);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers).toEqual({ "Content-Type": "application/json" });
	});
});
