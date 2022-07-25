import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import schema from './schema';
import { getProductById } from '../../services/product-service'
import { errorResponse, successResponse } from "../../utils/apiResponseBuilder";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log("Lambda invocation with event: ", JSON.stringify(event));
  const { productId } = event.pathParameters;

  try {
    const product = await getProductById(productId);
    if(product){
      console.log(`"Received product: ${ JSON.stringify( product ) }`);
      return successResponse(product, 200)
    }

    console.log("Lambda getProductsById invocation error: ", JSON.stringify({"message":"Product not found"}));
    return successResponse({"message":"Product not found"}, 404 );
    
    }catch (error) {
      console.log("Lambda getProductsById invocation error: ", JSON.stringify(error));
      return errorResponse(error, 500)
    }
};

export const main = middyfy(getProductsById);