import { DOMAIN_ERROR_MESSAGE } from '@domain/constants/constants';
import DomainException from '@domain/exceptions/domain-exception';
import Product from '@model/product';
import ProductRepository from '@ports/product-repository';

import { UpdateProductCommand } from './command';

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
    } catch (error) {
      throw new DomainException(
        error instanceof Error ? error.message : DOMAIN_ERROR_MESSAGE
      );
    }
  }
}
