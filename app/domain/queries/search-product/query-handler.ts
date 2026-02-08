import type Product from '@model/product';
import type ProductRepository from '@ports/product-repository';
import type { SearchProductQuery } from './query';
import { DOMAIN_ERROR_MESSAGE } from '@domain/constants/constants';
import DomainException from '@domain/exceptions/domain-exception';

export class SearchProductQueryHandler {
    constructor(private readonly repository: ProductRepository) {}

    async execute(command: SearchProductQuery): Promise<Product[] | Product> {
        try {
            return command && command.id
                ? await this.repository.get(command.id)
                : await this.repository.list();
        }
        catch (error) {
            throw new DomainException(
                error instanceof Error ? error.message : DOMAIN_ERROR_MESSAGE,
            );
        }
    }
}
