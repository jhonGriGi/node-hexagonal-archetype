import mysql from 'mysql2/promise';
import { FIRST_POSITION } from '../domain/constants/constants';
import Product from '../domain/model/product';
import ProductRepository from '../domain/ports/product-repository';

export class SqlDriverRepository implements ProductRepository {
    queryParser(model: object) {
        let queryString = '';
        const queryItems = [];
        const parameters = Object.keys(model);
        for (const item in parameters) {
            queryString += '?';
            queryItems.push(parameters[item]);
        }

        return {
            queryString,
            queryItems,
        };
    }

    async add(product: Product): Promise<void> {
        const conn = await mysql.createConnection({ database: 'Test' });
        const { queryString, queryItems } = this.queryParser(product);
        const query = `INSERT INTO products VALUES ${queryString}`;

        await conn.execute(query, queryItems);
        await conn.end();
    }

    async updateAttributes(product: Product): Promise<void> {
        const conn = await mysql.createConnection({ database: 'Test' });
        const { queryItems } = this.queryParser(product);
        const query = `UPDATE products SET id = ?, name = ? WHERE product.id = ?`;

        await conn.execute(query, queryItems);
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
