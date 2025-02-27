import { DeleteProductCommandHandler } from "@domain/command/delete_product/command_handler";
import { DeleteProductHandler } from "@lambda/product/delete_handler";
import { repositoryMock } from "./repository_mock";
import { Context } from "aws-lambda";

const command = new DeleteProductCommandHandler(repositoryMock);

describe("DeleteProductHandler test suit", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a success response", async () => {
		const handler = new DeleteProductHandler(command);

		const response = await handler.handler(
			{
				body: JSON.stringify({
					id: "1",
				}),
			} as any,
			{} as Context
		);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers).toEqual({ "Content-Type": "application/json" });
		expect(repositoryMock.delete).toHaveBeenCalled();
	});

	it("should return a 400 response", async () => {
		const handler = new DeleteProductHandler(command);

		const response = await handler.handler({} as any, {} as Context);

		expect(response.statusCode).toBe(400);
	});

	it("should return a error response", async () => {
		jest.spyOn(command, "execute").mockImplementation(() => {
			throw new Error();
		});

		const handler = new DeleteProductHandler(command);

		const response = await handler.handler({} as any, {} as Context);

		expect(response.statusCode).toBe(400);
		expect(response.body).toBeDefined();
	});
});
