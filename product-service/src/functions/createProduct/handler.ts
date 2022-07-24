import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { ProductServiceInterface } from "../../services/products";
import { ProductServices } from "../../services/product-service";
import schema from './schema';
//const ProductService: ProductServiceInterface = new ProductServices(); 
import { createProductService } from '../../services/product-service'
import { errorResponse, successResponse } from "../../utils/apiResponseBuilder";

//serverless invoke local --function createProductHandler --data '{"body":{"title":"Oneplus Nord","description":"A oneplus mobile which is nothing like apple","price": 99}'
const createProductHandler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const request  = event.body;
  console.log(event);
  const productData = {
    title: request.title,
    description: request.description,
    price: request.price,
  };
  //TODO validate req

  try {

    const product = await createProductService(productData);
//console.log(product);
    if(product){
     // console.log(`"Received product: ${ JSON.stringify( product ) }`);
      return successResponse(product, 200)
    }

    console.log(`Product not found`);
    return successResponse( { message: "Product not found" }, 404 );
    
    }catch (error) {

	    console.log(error)
      return errorResponse(error, 500)
    }
};

export const main = middyfy(createProductHandler);