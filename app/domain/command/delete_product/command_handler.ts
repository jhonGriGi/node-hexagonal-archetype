import ProductRepository from "@ports/product-repository";
import { DeleteProductCommand } from "./command";

export class DeleteProductCommandHandler {
  constructor(private readonly repository: ProductRepository) {
  }

  async execute(command: DeleteProductCommand): Promise<string> {
    const parsedCommand = DeleteProductCommand.parse(command);
    await this.repository.delete(parsedCommand.id);

    return parsedCommand.id;
  }
}
