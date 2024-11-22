import { z } from 'zod';

export type GetProductResponse = {
    id: string;
    name: string;
    description?: string;
    createDate: string;
    lastUpdateDate: string;
};

export const GetProductRequest = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});

export type CreateProductResponse = {
    id: string;
};

export const UpdateProductRequest = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});

export type UpdateProductResponse = {
    id: string;
};

export type DeleteProductResponse = {
    id: string;
};
