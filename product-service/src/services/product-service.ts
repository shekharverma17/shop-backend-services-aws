import { ProductServiceInterface, ProductInterface } from './products';
import { query, fetchProduct, createProduct } from '../modal/db-services'
//const pg = require('pg')

class ProductServices implements ProductServiceInterface {
    async getProductById(id: string) {
        //return Promise.resolve(products.find( product => product.id === parseInt(id) ));
        const { rows } = await fetchProduct(id);
        //console.log("called ===productList===", rows)
        return Promise.resolve(rows);
    }
    async createProductService(productData) {
        //return Promise.resolve(products.find( product => product.id === parseInt(id) ));
        const { rows } = await createProduct(productData);
        //console.log("called ===productList===", rows)
        return Promise.resolve(rows);
    }
    async getProducts() {

       const { rows } = await query();
        //console.log("called ===productList===", rows)
        return Promise.resolve(rows);
        //return Promise.reject('No Token Found In Local Storage')
    }
}
export const { getProductById, getProducts, createProductService } = new ProductServices()
export { ProductServices };