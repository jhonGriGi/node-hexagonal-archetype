import { CreateProductCommandHandler } from "@domain/command/create_product/command_handler";
import { CreateProductHandler } from "@lambda/product/create_handler";
import { repositoryMock } from "./repository_mock";
import { Context } from "aws-lambda";

const command = new CreateProductCommandHandler(repositoryMock);

describe("CreateProductHandler test suit", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a success response", async () => {
		const handler = new CreateProductHandler(command);

		const response = await handler.handler(
			{
				body: JSON.stringify({
					name: "mock name",
					description: "mock description",
				}),
			} as any,
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
			{
				body: JSON.stringify({
					name: "mock name",
					description: "mock description",
				}),
			} as any,
			{} as Context
		);

		expect(response.statusCode).toBe(400);
		expect(response.body).toBeDefined();
	});
});
