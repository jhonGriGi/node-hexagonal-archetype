import { UpdateProductCommandHandler } from "@domain/command/update_product/command_handler";
import { repositoryMock } from "./repository_mock";
import { UpdateProductHandler } from "@lambda/product/update_handler";
import { Context } from "aws-lambda";

const command = new UpdateProductCommandHandler(repositoryMock);

describe("UpdateProductHandler test suit", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a success response", async () => {
		const handler = new UpdateProductHandler(command);

		const response = await handler.handler(
			{
				body: JSON.stringify({
					id: "1",
					name: "mock name",
					description: "mock description",
				}),
			} as any,
			{} as Context
		);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers).toEqual({ "Content-Type": "application/json" });
		expect(repositoryMock.updateAttributes).toHaveBeenCalled();
	});

	it("should return a 400 response", async () => {
		const handler = new UpdateProductHandler(command);

		const response = await handler.handler({} as any, {} as Context);

		expect(response.statusCode).toBe(400);
	});

	it("should return a error response", async () => {
		jest.spyOn(command, "execute").mockImplementation(() => {
			throw new Error();
		});

		const handler = new UpdateProductHandler(command);

		const response = await handler.handler({} as any, {} as Context);

		expect(response.statusCode).toBe(400);
		expect(response.body).toBeDefined();
	});
});
