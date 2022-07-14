import { ProductServiceInterface, ProductInterface } from './products';
import products from './products-data.json';
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

    //     var dbConfig = {
    //         username: '<username>',
    //         password: '<password>',
    //         database: '<database>',
    //         host: '<db-endpoint>',
    //     };
    //     var client = new pg.Client(dbConfig);
    // try {
    //    // client.connect();
    //     await client.connect();
    //    // context.callbackWaitsForEmptyEventLoop = false;
    //     client.end();

    //     //send the response
    //     //callback(null,"Some Response")
    // }
    // catch (err) {
    //     console.log(err);
    //     client.end();
    //    // callback(err)
    // }

     //   console.log("called ===orignal===")
        //const error = new Error("message")
        //error.statusCode = 500
       // throw error;
      //  throw new Error("no password given");
        //return new Error('some product/stores invalid')
        //console.log("called ===orignal===")
       const { rows } = await query();
        //console.log("called ===productList===", rows)
        return Promise.resolve(rows);
        //return Promise.reject('No Token Found In Local Storage')
    }
}
export const { getProductById, getProducts, createProductService } = new ProductServices()
export { ProductServices };