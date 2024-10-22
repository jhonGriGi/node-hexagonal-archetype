import UpdateProductCommand from '../commands/update-product-command';
import Product from '../model/product';
import ProductRepository from '../ports/product-repository';

export class UpdateProductCommandHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: UpdateProductCommand): Promise<string> {
        const currentTime = Date.now().toString();

        const product: Product = {
            id: command.id,
            name: command.name,
            description: command.description,
            lastUpdateDate: currentTime,
        };

        await this.repository.updateAttributes(product);

        return command.id;
    }
}
