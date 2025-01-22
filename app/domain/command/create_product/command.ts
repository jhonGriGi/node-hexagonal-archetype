import { z } from 'zod'

export const CreateProductCommand = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

export default CreateProductCommand
