import { z } from 'zod'

export const GetProductResponse = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  createDate: z.string().min(1),
  lastUpdateDate: z.string().min(1)
})

export type GetProductResponse = z.infer<typeof GetProductResponse>

export const GetProductRequest = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

export type GetProductRequest = z.infer<typeof GetProductRequest>

export const CreateProductResponse = z.object({
  id: z.string().min(1).uuid()
})

export type CreateProductResponse = z.infer<typeof CreateProductResponse>

export const UpdateProductRequest = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

export type UpdateProductRequest = z.infer<typeof UpdateProductRequest>

export const UpdateProductResponse = z.object({
  id: z.string().min(1)
})

export type UpdateProductResponse = z.infer<typeof UpdateProductResponse>

export const DeleteProductResponse = z.object({
  id: z.string().min(1)
})

export type DeleteProductResponse = z.infer<typeof DeleteProductResponse>
