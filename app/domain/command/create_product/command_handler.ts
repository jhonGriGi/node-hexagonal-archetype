import { CreateProductCommand } from "@domain/command/create_product/command";
import { DOMAIN_ERROR_MESSAGE } from "@domain/constants/constants";
import DomainException from "@domain/exceptions/domain-exception";
import Product from "@model/product";
import ProductRepository from "@ports/product-repository";
import { randomUUID } from "crypto";

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
		} catch (error) {
			throw new DomainException(
				error instanceof Error ? error.message : DOMAIN_ERROR_MESSAGE
			);
		}
	}
}
