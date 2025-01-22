import { z } from 'zod'

export interface GetProductResponse {
  id: string
  name: string
  description?: string
  createDate: string
  lastUpdateDate: string
}

export const GetProductRequest = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

export interface CreateProductResponse {
  id: string
}

export const UpdateProductRequest = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

export interface UpdateProductResponse {
  id: string
}

export interface DeleteProductResponse {
  id: string
}
