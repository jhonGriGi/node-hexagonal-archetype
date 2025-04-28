import { DOMAIN_ERROR_MESSAGE } from '@domain/constants/constants';
import DomainException from '@domain/exceptions/domain-exception';
import { SearchProductQuery } from '@domain/queries/search_product/query';
import Product from '@model/product';
import ProductRepository from '@ports/product-repository';

export class SearchProductQueryHandler {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: SearchProductQuery): Promise<Product[] | Product> {
    try {
      return command && command.id
        ? await this.repository.get(command.id)
        : await this.repository.list();
    } catch (error) {
      throw new DomainException(
        error instanceof Error ? error.message : DOMAIN_ERROR_MESSAGE
      );
    }
  }
}
