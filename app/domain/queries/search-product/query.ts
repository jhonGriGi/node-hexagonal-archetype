import { z } from 'zod';

export const searchProductQuery = z.object({
    id: z.string().optional().nullable(),
});

export type SearchProductQuery = z.infer<typeof searchProductQuery>;
