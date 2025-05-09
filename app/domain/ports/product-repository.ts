import Product from '../model/product';

interface ProductRepository {
  add: (product: Product) => Promise<void>;
  updateAttributes: (product: Product) => Promise<void>;
  get: (productId: string) => Promise<Product>;
  list: () => Promise<Product[]>;
  delete: (productId: string) => Promise<void>;
}

export default ProductRepository;
