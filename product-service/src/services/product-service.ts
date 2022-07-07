import { ProductServiceInterface, ProductInterface } from './products';
import products from './products-data.json';
class ProductServices implements ProductServiceInterface {
    getProductById(id: string) {
        return Promise.resolve(products.find( product => product.id === parseInt(id) ));
    }
    
    getProducts() {
        console.log("called ===orignal===")
        //const error = new Error("message")
        //error.statusCode = 500
       // throw error;
        throw new Error("no password given");
        //return new Error('some product/stores invalid')
        console.log("called ===orignal===")
        //return Promise.resolve(products);
        return Promise.reject('No Token Found In Local Storage')
    }
}
export const { getProductById, getProducts } = new ProductServices()
export { ProductServices };