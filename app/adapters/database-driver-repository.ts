import Product from "@domain/model/product";
import ProductRepository from "@domain/ports/product-repository";
import { FIRST_POSITION } from "@domain/constants/constants";
import { DatabaseConfig } from "@libraries/orm/internals/database-config";

export class DatabaseDriverRepository implements ProductRepository {
	private readonly dbConfig: DatabaseConfig;

	constructor(dbConfig: DatabaseConfig) {
		this.dbConfig = dbConfig;
	}
	public async list(): Promise<Product[] | null> {
		await this.dbConfig.connect();
		const connection = this.dbConfig.getConnection();

		const query = "SELECT * FROM products";
		const [results] = await connection.query(query);

		await this.dbConfig.disconnect();

		return results;
	}

	public async add(product: Product): Promise<void> {
		await this.dbConfig.connect();
		const connection = this.dbConfig.getConnection();

		const query = "INSERT INTO products VALUES (?, ?, ?, ?, ?)";
		await connection.query(query, [
			product.id,
			product.name,
			product.description,
			product.create_date,
			product.last_update_date,
		]);

		await this.dbConfig.disconnect();
	}

	public async updateAttributes(product: Product): Promise<void> {
		await this.dbConfig.connect();
		const connection = this.dbConfig.getConnection();

		const query =
			"UPDATE products SET name = ?, description = ?, last_update_date = ? WHERE products.id = ?";
		await connection.query(query, [
			product.name,
			product.description,
			product.last_update_date,
			product.id,
		]);

		await this.dbConfig.disconnect();
	}

	public async get(productId: string): Promise<Product | null> {
		await this.dbConfig.connect();
		const connection = this.dbConfig.getConnection();

		const query = "SELECT * FROM products WHERE products.id = ?";
		const queryResponse = await connection.query(query, [productId]);

		await this.dbConfig.disconnect();

		return queryResponse[FIRST_POSITION] as unknown as Product;
	}

	public async delete(productId: string): Promise<void> {
		await this.dbConfig.connect();
		const connection = this.dbConfig.getConnection();

		const query = "DELETE FROM products WHERE products.id = ?";
		await connection.query(query, [productId]);

		await this.dbConfig.disconnect();
	}
}
