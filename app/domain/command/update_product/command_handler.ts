import Product from '@model/product'
import ProductRepository from '@ports/product-repository'
import { UpdateProductCommand } from './command'

export class UpdateProductCommandHandler {
  constructor (private readonly repository: ProductRepository) {
  }

  async execute (command: UpdateProductCommand): Promise<string> {
    const currentTime = Date.now().toString()
    const parsedCommand = UpdateProductCommand.parse(command)
    const product: Product = {
      id: parsedCommand.id,
      name: parsedCommand.name,
      description: parsedCommand.description,
      last_update_date: currentTime
    }

    await this.repository.updateAttributes(product)

    return parsedCommand.id;
  }
}
