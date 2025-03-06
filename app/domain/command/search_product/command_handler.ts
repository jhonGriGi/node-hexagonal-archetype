import { SearchProductCommand } from "@domain/command/search_product/command";
import { DOMAIN_ERROR_MESSAGE } from "@domain/constants/constants";
import DomainException from "@domain/exceptions/domain-exception";
import Product from "@domain/model/product";
import ProductRepository from "@ports/product-repository";

export class SearchProductCommandHandler {
	constructor(private readonly repository: ProductRepository) {}

	async execute(command: SearchProductCommand): Promise<Product[] | Product | null> {
		try {
			return command.id
				? await this.repository.get(command.id)
				: await this.repository.list();
		} catch (error) {
			throw new DomainException(
				error instanceof Error ? error.message : DOMAIN_ERROR_MESSAGE
			);
		}
	}
}
