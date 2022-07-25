import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import schema, { CreateProductRequest } from './schema';
import { createProductService } from '../../services/product-service'
import { errorResponse, successResponse } from "../../utils/apiResponseBuilder";

const createProductHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(`Request for create product. Product Data: ${JSON.stringify(event)}`)
  if(false === validateRequest(event))
  {
    return errorResponse(new Error("Product data is invalid!"), 400)
  }
  const request  = event.body as CreateProductRequest

  const productData = {
    title: request.title,
    description: request.description,
    price: request.price,
  }

  try {

    const product = await createProductService(productData);
    if(product){
      return successResponse(product, 200)
    }

    console.log("Lambda createProductHandler error: ", JSON.stringify({ message: "Product not found" }))
    return successResponse( { message: "Product not found" }, 404 );
    
    }catch (error) {
      console.log("Lambda createProductHandler error: ", JSON.stringify(error))
      return errorResponse(error, 500)
    }
};

const validateRequest = (request) =>{
  if(!request.body || Object.keys(request.body).length === 0) return false
  if(!request.body.title || request.body.title === '') return false
  if (!request.body.title || typeof request.body.title != 'string' || request.body.title.length === 0) {
    return false
  }
  if (!request.body.description || typeof request.body.description != 'string' || request.body.description.length === 0) {
    return false
  }
  if (!request.body.price || typeof request.body.price != 'number') {
    return false
  }
  return true;
}
export const main = middyfy(createProductHandler);