import { z } from 'zod';

export const createProductCommand = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});

export type CreateProductCommand = z.infer<typeof createProductCommand>;
