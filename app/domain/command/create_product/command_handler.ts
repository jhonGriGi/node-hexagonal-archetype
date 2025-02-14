import { CreateProductCommand } from '@domain/command/create_product/command'
import Product from '@model/product'
import ProductRepository from '@ports/product-repository'
import { randomUUID } from 'crypto'

export class CreateProductCommandHandler {
  constructor (private readonly repository: ProductRepository) {
  }

  async execute (command: CreateProductCommand): Promise<string> {
    const currentTime = Date.now().toString()
    const id = randomUUID()
    const parsedCommand = CreateProductCommand.parse(command)
    const product: Product = {
      id,
      name: parsedCommand.name,
      description: parsedCommand.description,
      createDate: currentTime,
      lastUpdateDate: currentTime
    }

    await this.repository.add(product)

    return id
  }
}
