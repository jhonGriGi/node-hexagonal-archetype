import { SearchProductCommandHandler } from "@domain/command/search_product/command_handler";
import { SearchProductHandler } from "@lambda/product/search_handler";
import { repositoryMock } from "./repository_mock";
import { Context } from "aws-lambda";

const command = new SearchProductCommandHandler(repositoryMock);

describe("SearchProductHandler test suit", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a success response from id", async () => {
		const handler = new SearchProductHandler(command);

		const response = await handler.handler(
			{
				pathParameters: {
					id: "1",
				},
			} as any,
			{} as Context
		);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers).toEqual({ "Content-Type": "application/json" });
		expect(repositoryMock.get).toHaveBeenCalled();
	});

	it("should return a success response", async () => {
		const handler = new SearchProductHandler(command);

		const response = await handler.handler({} as any, {} as Context);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers).toEqual({ "Content-Type": "application/json" });
	});
});
