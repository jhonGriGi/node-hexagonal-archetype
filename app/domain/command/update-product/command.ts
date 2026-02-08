import { z } from 'zod';

export const updateProductCommand = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
});

export type UpdateProductCommand = z.infer<typeof updateProductCommand>;
