import { randomUUID } from 'crypto';
import CreateProductCommand from './command';
import Product from '@model/product';
import ProductRepository from '@ports/product-repository';

export class CreateProductCommandHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: typeof CreateProductCommand): Promise<string> {
        const currentTime = Date.now().toString();
        const id = randomUUID();
        const parsedCommand = CreateProductCommand.parse(command);
        const product: Product = {
            id,
            name: parsedCommand.name,
            description: parsedCommand.description,
            createDate: currentTime,
            lastUpdateDate: currentTime,
        };

        await this.repository.add(product);

        return id;
    }
}
