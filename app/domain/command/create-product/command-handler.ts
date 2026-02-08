import type Product from '@model/product';
import type ProductRepository from '@ports/product-repository';
import type { CreateProductCommand } from './command';
import { randomUUID } from 'node:crypto';
import { DOMAIN_ERROR_MESSAGE } from '@domain/constants/constants';
import DomainException from '@domain/exceptions/domain-exception';

export class CreateProductCommandHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: CreateProductCommand): Promise<string> {
        try {
            const currentTime = Date.now().toString();
            const id = randomUUID();
            const product: Product = {
                id,
                name: command.name,
                description: command.description,
                create_date: currentTime,
                last_update_date: currentTime,
            };

            await this.repository.add(product);

            return id;
        }
        catch (error) {
            throw new DomainException(
                error instanceof Error ? error.message : DOMAIN_ERROR_MESSAGE,
            );
        }
    }
}
