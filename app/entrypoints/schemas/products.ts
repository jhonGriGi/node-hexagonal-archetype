import { z } from "zod";

export const GetProductsResponse = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	description: z.string().optional(),
	createDate: z.string().min(1),
	lastUpdateDate: z.string().min(1),
});

export type GetProductsResponse = z.infer<typeof GetProductsResponse>;

export const GetAllProductsResponse = z.array(
	z.object({
		id: z.string().min(1),
		name: z.string().min(1),
		description: z.string().optional(),
		createDate: z.string().min(1),
		lastUpdateDate: z.string().min(1),
	})
);

export type GetAllProductsResponse = z.infer<typeof GetAllProductsResponse>;

export const GetProductRequest = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
});

export type GetProductRequest = z.infer<typeof GetProductRequest>;

export const CreateProductResponse = z.object({
	id: z.string().min(1).uuid(),
});

export type CreateProductResponse = z.infer<typeof CreateProductResponse>;

export const UpdateProductRequest = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
});

export type UpdateProductRequest = z.infer<typeof UpdateProductRequest>;

export const UpdateProductResponse = z.object({
	id: z.string().min(1),
});

export type UpdateProductResponse = z.infer<typeof UpdateProductResponse>;

export const DeleteProductResponse = z.object({
	id: z.string().min(1),
});

export type DeleteProductResponse = z.infer<typeof DeleteProductResponse>;
