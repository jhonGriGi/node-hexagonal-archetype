import { randomUUID } from 'crypto';
import CreateProductCommand from '../commands/create-product-command';
import Product from '../model/product';
import ProductRepository from '../ports/product-repository';

export class CreateProductCommandHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: CreateProductCommand): Promise<string> {
        const currentTime = Date.now().toString();
        const id = randomUUID();

        const product: Product = {
            id,
            name: command.name,
            description: command.description,
            createDate: currentTime,
            lastUpdateDate: currentTime,
        };

        await this.repository.add(product);

        return id;
    }
}
