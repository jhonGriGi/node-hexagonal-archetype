import { APIGatewayEvent } from "aws-lambda";

describe("ProductsHandler test suit", () => {
	it("Should return a hello world in response with status 200", async () => {
		const response = await handlerClass.handler({} as APIGatewayEvent, {} as any);
		const bodyParsed = JSON.parse(response.body ?? "{}");

		expect(response.statusCode).toBe(200);
		expect(bodyParsed).toEqual({
			Hello: "World",
		});
	});
});
