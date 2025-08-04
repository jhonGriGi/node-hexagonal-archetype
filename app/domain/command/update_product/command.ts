import { z } from 'zod';

export const UpdateProductCommand = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
});

export type UpdateProductCommand = z.infer<typeof UpdateProductCommand>;
