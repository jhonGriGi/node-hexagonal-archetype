import { z } from 'zod';

export const getProductsResponse = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    create_date: z.string().min(1),
    last_update_date: z.string().min(1),
});

export type GetProductsResponse = z.infer<typeof getProductsResponse>;

export const getAllProductsResponse = z.array(
    z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        create_date: z.string().min(1),
        last_update_date: z.string().min(1),
    }),
);

export type GetAllProductsResponse = z.infer<typeof getAllProductsResponse>;

export const getProductSchema = z.object({
    pathParameters: z
        .object({
            id: z.string().optional(),
        })
        .optional()
        .nullable(),
});

export type GetProductDTO = z.infer<typeof getProductSchema>;

export const createProductResponse = z.object({
    id: z.string().min(1).uuid(),
});

export type CreateProductResponse = z.infer<typeof createProductResponse>;

export const CreateProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = z.object({
    body: z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
    }),
});
export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;

export type UpdateProductResponse = {
    id: string;
};

export type DeleteProductResponse = {
    id: string;
};

export const DeleteProductSchema = z.object({
    pathParameters: z.object({
        id: z.string().min(1),
    }),
});

export type DeleteProductDTO = z.infer<typeof DeleteProductSchema>;
