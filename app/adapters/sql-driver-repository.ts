import Product from '@domain/model/product'
import ProductRepository from '@domain/ports/product-repository'
import { FIRST_POSITION } from '@domain/constants/constants'
import { DatabaseConfig } from '@libraries/orm/internals/database-config'

export class SqlDriverRepository implements ProductRepository {
  private readonly dbConfig: DatabaseConfig

  constructor (dbConfig: DatabaseConfig) {
    this.dbConfig = dbConfig
  }

  public async add (product: Product): Promise<void> {
    await this.dbConfig.connect()
    const connection = this.dbConfig.getConnection()

    const query = 'INSERT INTO products VALUES (?, ?, ?, ?, ?)'
    await connection.execute(query, [
      product.id,
      product.name,
      product.description,
      product.createDate,
      product.lastUpdateDate
    ])

    await this.dbConfig.disconnect()
  }

  public async updateAttributes (product: Product): Promise<void> {
    await this.dbConfig.connect()
    const connection = this.dbConfig.getConnection()

    const query =
			'UPDATE products SET name = ?, description = ?, lastUpdateDate = ? WHERE product.id = ?'
    await connection.execute(query, [
      product.name,
      product.description,
      product.lastUpdateDate,
      product.id
    ])

    await this.dbConfig.disconnect()
  }

  public async get (productId: string): Promise<Product | null> {
    await this.dbConfig.connect()
    const connection = this.dbConfig.getConnection()

    const query = 'SELECT * FROM products WHERE product.id = ?'
    const queryResponse = await connection.execute(query, [productId])

    await this.dbConfig.disconnect()

    return queryResponse[FIRST_POSITION] as unknown as Product
  }

  public async delete (productId: string): Promise<void> {
    await this.dbConfig.connect()
    const connection = this.dbConfig.getConnection()

    const query = 'DELETE FROM products WHERE productId = ?'
    await connection.execute(query, [productId])

    await this.dbConfig.disconnect()
  }
}
