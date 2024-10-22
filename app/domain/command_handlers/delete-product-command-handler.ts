import DeleteProductCommand from '../commands/delete-product-command';
import ProductRepository from '../ports/product-repository';

export class DeleteProductCommandHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: DeleteProductCommand): Promise<string> {
        await this.repository.delete(command.id);

        return command.id;
    }
}
