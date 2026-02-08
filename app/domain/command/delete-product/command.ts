import { z } from 'zod';

export const deleteProductCommand = z.object({
    id: z.string().min(1),
});

export type DeleteProductCommand = z.infer<typeof deleteProductCommand>;
