import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductServiceInterface } from "../../services/products";
import { ProductServices } from "../../services/product-service";
import schema from './schema';
const ProductService: ProductServiceInterface = new ProductServices(); 
import { errorResponse, successResponse } from "../../utils/apiResponseBuilder";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;

  try {

    const product = await ProductService.getProductById(productId);
console.log(product);
    if(product){
      console.log(`"Received product: ${ JSON.stringify( product ) }`);
      return successResponse(product, 200)
    }

    console.log(`Product not found`);
    return successResponse( { message: "Product not found" }, 404 );
    
    }catch (error) {

	    console.log(error)
      return errorResponse(error, 500)
    }
};

export const main = middyfy(getProductsById);