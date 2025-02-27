import { SearchProductCommand } from "@domain/command/search_product/command";
import Product from "@domain/model/product";
import ProductRepository from "@ports/product-repository";

export class SearchProductCommandHandler {
	constructor(private readonly repository: ProductRepository) {}

	async execute(command: SearchProductCommand): Promise<Product[] | Product | null> {
		const parsedCommand = SearchProductCommand.safeParse(command);

		return parsedCommand.data?.id
			? await this.repository.get(parsedCommand.data.id)
			: await this.repository.list();
	}
}
