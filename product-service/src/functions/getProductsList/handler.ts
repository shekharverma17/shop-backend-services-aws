import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
//import { middyfy } from '@libs/lambda';

import { middyfy } from '../../libs/lambda';
//import { ProductServiceInterface } from "../../services/products";
//import { ProductServices } from "../../services/product-service";
import schema from './schema';
//const ProductService: ProductServiceInterface = new ProductServices(); 
import { getProducts } from '../../services/product-service'
//import { errorResponse, successResponse } from "../utils/apiResponseBuilder";
import { errorResponse, successResponse } from "../../utils/apiResponseBuilder";
const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log("Lambda invocation with event: ", JSON.stringify(event));

  try {

    const products = await getProducts();
    //console.log(`Product=====`, products);
    if(products && products.length){
   //   console.log(`"Received products: ${ JSON.stringify( products ) }`);
      return successResponse(products, 200)
    }

    console.log(`Product not found`, products);
    return successResponse( { message: "Product not found" }, 404 );
    
    }catch (error) {

	    console.log("==error===", error)
      return errorResponse(error, 500)
    }
};

export const main = middyfy(getProductsList);