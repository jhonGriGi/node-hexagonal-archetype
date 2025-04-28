import { z } from 'zod';

export const SearchProductQuery = z.object({
  id: z.string().optional().nullable(),
});

export type SearchProductQuery = z.infer<typeof SearchProductQuery>;
