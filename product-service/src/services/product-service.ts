import { ProductServiceInterface, ProductInterface } from './products';
import { products } from './products-data.json';
class ProductServices implements ProductServiceInterface {
    fetchProductById(id: string) {
        console.log("===id=", id);
      // console.log(products);
        //console.log(products.find( product => product.id === "1"));
        return Promise.resolve(products.find( product => product.id === id));
    }
    
    getProducts() {
        console.log("called ===orignal===1")
        //const error = new Error("message")
        //error.statusCode = 500
       // throw error;
      //  throw new Error("no password given");
        //return new Error('some product/stores invalid')
        //console.log("called ===orignal===")
        return Promise.resolve(products);
        //return Promise.reject('No Token Found In Local Storage')
    }
}
export const { fetchProductById, getProducts } = new ProductServices()
export { ProductServices };