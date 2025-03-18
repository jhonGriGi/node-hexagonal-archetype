import { z } from "zod";

export const SearchProductCommand = z.object({
	id: z.string().optional(),
});

export type SearchProductCommand = z.infer<typeof SearchProductCommand>;
