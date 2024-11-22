import UpdateProductCommand from './command';
import Product from '@model/product';
import ProductRepository from '@ports/product-repository';

export class UpdateProductCommandHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: typeof UpdateProductCommand): Promise<string> {
        const currentTime = Date.now().toString();
        const parsedCommand = UpdateProductCommand.parse(command);
        const product: Product = {
            id: parsedCommand.id,
            name: parsedCommand.name,
            description: parsedCommand.description,
            lastUpdateDate: currentTime,
        };

        await this.repository.updateAttributes(product);

        return parsedCommand.id;
    }
}
