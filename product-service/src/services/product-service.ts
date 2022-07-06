import { ProductServiceInterface, ProductInterface } from './products';
import products from './products-data.json';
class ProductServices implements ProductServiceInterface {
    getProductById(id: string) {
        return Promise.resolve(products.find( product => product.id === parseInt(id) ));
    }
    
    getProducts() {
        return Promise.resolve(products);
    }
}

export { ProductServices };