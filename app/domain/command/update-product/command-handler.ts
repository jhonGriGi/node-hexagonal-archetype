import type Product from '@model/product';
import type ProductRepository from '@ports/product-repository';
import type { UpdateProductCommand } from './command';
import { DOMAIN_ERROR_MESSAGE } from '@domain/constants/constants';

import DomainException from '@domain/exceptions/domain-exception';

export class UpdateProductCommandHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: UpdateProductCommand): Promise<string> {
        try {
            const currentTime = Date.now().toString();
            const product: Product = {
                id: command.id,
                name: command.name,
                description: command.description,
                last_update_date: currentTime,
            };

            await this.repository.updateAttributes(product);

            return command.id;
        }
        catch (error) {
            throw new DomainException(
                error instanceof Error ? error.message : DOMAIN_ERROR_MESSAGE,
            );
        }
    }
}
