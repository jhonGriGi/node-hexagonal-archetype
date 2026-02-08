import type Product from '@domain/model/product';
import type ProductRepository from '@domain/ports/product-repository';

export class InMemoryRepository implements ProductRepository {
    private products: Map<string, Product> = new Map();

    public async list(): Promise<Product[]> {
        return Array.from(this.products.values());
    }

    public async add(product: Product): Promise<void> {
        this.products.set(product.id, product);
    }

    public async updateAttributes(product: Product): Promise<void> {
        this.products.set(product.id, product);
    }

    public async get(productId: string): Promise<Product> {
        const product = this.products.get(productId);
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
        return product;
    }

    public async delete(productId: string): Promise<void> {
        this.products.delete(productId);
    }
}
