import mysql from 'mysql2/promise';
import { FIRST_POSITION } from '../domain/constants/constants';
import Product from '../domain/model/product';
import ProductRepository from '../domain/ports/product-repository';

export class SqlDriverRepository implements ProductRepository {
    async add(product: Product): Promise<void> {
        const conn = await mysql.createConnection({ database: 'Test' });
        const query = `INSERT INTO products VALUES (?, ?, ?, ?, ?)`;

        await conn.execute(query, [
            product.id,
            product.name,
            product.description,
            product.createDate,
            product.lastUpdateDate,
        ]);
        await conn.end();
    }

    async updateAttributes(product: Product): Promise<void> {
        const conn = await mysql.createConnection({ database: 'Test' });
        const query = `UPDATE products SET name = ?, description = ?, lastUpdateDate = ? WHERE product.id = ?`;

        await conn.execute(query, [product.name, product.description, product.lastUpdateDate, product.id]);
        await conn.end();
    }

    async get(productId: string): Promise<Product | null> {
        const conn = await mysql.createConnection({ database: 'Test' });
        const query = `SELECT * FROM products WHERE product.id = ?`;

        const queryResponse = await conn.execute(query, productId);
        await conn.end();

        return queryResponse[FIRST_POSITION] as unknown as Product;
    }

    async delete(productId: string): Promise<void> {
        const conn = await mysql.createConnection({ database: 'Test' });
        const query = `DELETE FROM products WHERE productId = ?`;

        await conn.execute(query, productId);
        await conn.end();
    }
}
