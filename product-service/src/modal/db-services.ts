import { DBServicesInterface } from "./db"
import { dbQuery, createDBQuery } from './db-helper'

class DBServices implements DBServicesInterface {
    async fetchProduct(id: string){
        try {
           const result = await dbQuery(`SELECT p.id, p.title, p.description, p.price, s.count FROM products p, stocks s 
           WHERE p.id=s.product_id 
           and p.id = '${id}'`)
           return Promise.resolve(result);
          } catch (err) {
            return Promise.reject(err);
          }
      }
      
      async createProduct(productData){
        try {
           const result = await createDBQuery(productData)
           return Promise.resolve(result);
          } catch (error) {
            return Promise.reject(error);
          }
      }

      async query(){
        try {
           const result = await dbQuery("select * from products")
           return Promise.resolve(result);
          } catch (error) {
            return Promise.reject(error);
          }
      }
}
export const { query, fetchProduct, createProduct } = new DBServices()
export { DBServices };