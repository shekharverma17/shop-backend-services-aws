import { ProductServiceInterface } from './products';
import { products } from './products-data.json';
class ProductServices implements ProductServiceInterface {
    fetchProductById(id: string) {
        return Promise.resolve(products.find( product => product.id === id));
    }
    
    getProducts() {
        return Promise.resolve(products);
    }
}
export const { fetchProductById, getProducts } = new ProductServices()