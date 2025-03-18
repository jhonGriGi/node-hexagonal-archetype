import { FIRST_POSITION } from "@domain/constants/constants";
import Product from "@domain/model/product";
import ProductRepository from "@domain/ports/product-repository";
import { DatabaseConfig } from "@libraries/orm/internals/database-config";

export class DatabaseDriverRepository implements ProductRepository {
  private readonly dbConfig: DatabaseConfig;

  constructor(dbConfig: DatabaseConfig) {
    this.dbConfig = dbConfig;
  }

  public async list(): Promise<Product[]> {
    await this.dbConfig.connect();

    const query = "SELECT * FROM products";
    const results = await this.dbConfig.query(query, []);

    await this.dbConfig.disconnect();

    return results;
  }

  public async add(product: Product): Promise<void> {
    await this.dbConfig.connect();

    const query = "INSERT INTO products VALUES (?, ?, ?, ?, ?)";
    await this.dbConfig.query(query, [
      product.id,
      product.name,
      product.description,
      product.create_date,
      product.last_update_date
    ]);

    await this.dbConfig.disconnect();
  }

  public async updateAttributes(product: Product): Promise<void> {
    await this.dbConfig.connect();

    const query =
      "UPDATE products SET name = ?, description = ?, last_update_date = ? WHERE products.id = ?";
    await this.dbConfig.query(query, [
      product.name,
      product.description,
      product.last_update_date,
      product.id
    ]);

    await this.dbConfig.disconnect();
  }

  public async get(productId: string): Promise<Product> {
    await this.dbConfig.connect();

    const query = "SELECT * FROM products WHERE products.id = ?";
    const queryResponse = await this.dbConfig.query(query, [productId]);

    await this.dbConfig.disconnect();
    return queryResponse[FIRST_POSITION] as unknown as Product;
  }

  public async delete(productId: string): Promise<void> {
    await this.dbConfig.connect();

    const query = "DELETE FROM products WHERE products.id = ?";
    await this.dbConfig.query(query, [productId]);

    await this.dbConfig.disconnect();
  }
}
