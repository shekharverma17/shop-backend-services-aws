import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import schema from './schema';
import { getProducts } from '../../services/product-service'
import { errorResponse, successResponse } from "../../utils/apiResponseBuilder";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log("Lambda invocation with event: ", JSON.stringify(event));

  try {

    const products = await getProducts();
    if(products && products.length){
      return successResponse(products, 200)
    }

    console.log(`Product not found`, products);
    return successResponse({"message":"Product not found"}, 404 )
    
    }catch (error) {
	    console.log(error)
      return errorResponse(error, 500)
    }
};

export const main = middyfy(getProductsList);