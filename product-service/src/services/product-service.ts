import { ProductServiceInterface } from './products';
import { query, fetchProduct, createProduct } from '../modal/db-services'

class ProductServices implements ProductServiceInterface {
    async getProductById(id: string) {
        const { rows } = await fetchProduct(id);
        return Promise.resolve(rows)
    }
    async createProductService(productData) {
        const { rows } = await createProduct(productData);
        return Promise.resolve(rows)
    }
    async getProducts() {
       const { rows } = await query()
        return Promise.resolve(rows)
    }
}
export const { getProductById, getProducts, createProductService } = new ProductServices()
export { ProductServices }