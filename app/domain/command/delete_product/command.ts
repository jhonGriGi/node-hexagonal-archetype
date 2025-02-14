import { z } from 'zod'

export const DeleteProductCommand = z.object({
  id: z.string().min(1)
})

export type DeleteProductCommand = z.infer<typeof DeleteProductCommand>
