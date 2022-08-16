export interface DBServicesInterface {
    fetchProduct: (id: string) => Promise<any>
    createProduct: (productData: object) => Promise<any>
    query: () => Promise<any>
}