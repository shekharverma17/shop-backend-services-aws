export interface ProductInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    count: number,
    rating: Object,
}

export interface ProductServiceInterface {
    getProductById: (id: string) => Promise<ProductInterface>,
    getProducts: () => Promise<ProductInterface[]>
}