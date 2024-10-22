import Product from '../domain/model/product';
import ProductRepository from '../domain/ports/product-repository';

export class SequelizeRepository implements ProductRepository {
    add(product: Product): Promise<void> {
        throw new Error('Method not implemented.');
    }
    updateAttributes(product: Product): Promise<void> {
        throw new Error('Method not implemented.');
    }
    get(productId: string): Promise<Product | null> {
        throw new Error('Method not implemented.');
    }
    delete(productId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
