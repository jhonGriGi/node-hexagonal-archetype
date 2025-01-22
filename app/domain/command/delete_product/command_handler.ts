import DeleteProductCommand from './command'
import ProductRepository from '@ports/product-repository'

export class DeleteProductCommandHandler {
  constructor (private readonly repository: ProductRepository) {}

  async execute (command: typeof DeleteProductCommand): Promise<string> {
    const parsedCommand = DeleteProductCommand.parse(command)
    await this.repository.delete(parsedCommand.id)

    return parsedCommand.id
  }
}
