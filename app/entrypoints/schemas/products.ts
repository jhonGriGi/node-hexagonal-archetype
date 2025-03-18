import { APIGatewayProxyEventSchema } from "@aws-lambda-powertools/parser/schemas";

import { z } from "zod";

export const GetProductsResponse = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	description: z.string().optional(),
	create_date: z.string().min(1),
	last_update_date: z.string().min(1),
});

export type GetProductsResponse = z.infer<typeof GetProductsResponse>;

export const GetAllProductsResponse = z.array(
	z.object({
		id: z.string().min(1),
		name: z.string().min(1),
		description: z.string().optional(),
		create_date: z.string().min(1),
		last_update_date: z.string().min(1),
	})
);

export type GetAllProductsResponse = z.infer<typeof GetAllProductsResponse>;

export const GetProductSchema = APIGatewayProxyEventSchema.extend({
	pathParameters: z.object({
		id: z.string().optional(),
	}),
});

export type GetProductDTO = z.infer<typeof GetProductSchema>;

export const CreateProductResponse = z.object({
	id: z.string().min(1).uuid(),
});

export type CreateProductResponse = z.infer<typeof CreateProductResponse>;

export const CreateProductSchema = APIGatewayProxyEventSchema.extend({
	body: z.object({
		name: z.string().min(1),
		description: z.string().min(1),
	}),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = APIGatewayProxyEventSchema.extend({
	body: z.object({
		id: z.string().min(1),
		name: z.string().min(1),
		description: z.string().min(1),
	}),
});

export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;

export const UpdateProductResponse = z.object({
	id: z.string().min(1),
});

export type UpdateProductResponse = z.infer<typeof UpdateProductResponse>;

export const DeleteProductResponse = z.object({
	id: z.string().min(1),
});

export type DeleteProductResponse = z.infer<typeof DeleteProductResponse>;

export const DeleteProductSchema = APIGatewayProxyEventSchema.extend({
	pathParameters: z.object({
		id: z.string().min(1),
	}),
});

export type DeleteProductDTO = z.infer<typeof DeleteProductSchema>;
