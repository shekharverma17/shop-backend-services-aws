import AWS from 'aws-sdk';
import * as handlers from './src/handlers';

const s3 = new AWS.S3({ region: 'us-east-1' });


//export { importProductsFile } from './importProductsFile';
// export const getAllProducts = handlers.importProductsFile({
//     s3,
// });

//const BUCKET = process.env.BUCKET;
const BUCKET = 'node-js-aws-s3-task5'
import { errorResponse, successResponse } from "./src/utils/responseBuilder";
//serverless invoke local --function importProductsFile --data '{ "queryStringParameters": {"name":"product.csv"}}'
//serverless invoke local --function hello 
module.exports.hello = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Go Serverless v3.0! Your function executed successfully!',
          input: event,
        },
        null,
        2
      ),
    };
  };
module.exports.hello = async (event) => {
    let response = {}
    let searchText = "testing"
    let filterBy = "id"
    try {
    // Get search results
    const searchResult = await fetchSearchResult(searchText, filterBy);
    if (searchResult && searchResult.length > 0) {
      response.data = searchResult;
      response.message = "Results fetched!";
    } else {
      response.data = searchResult || [];
      response.message = "No results found";
    }
    response.statusCode = 200;
  
    // console.log("response:", response);
    return response;
  }catch (error) {
    response.statusCode = 400;
  
    if (error) {
      response.ErrorMessages = [error.message];
    }
  
    return response;
  }
    // return {
    //   statusCode: 200,
    //   body:
    //     {
    //       name: 'book',
    //       price: 123,
    //     }
    // };
  
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  };

export const importProductsFile = ({
    s3,
}) => async (event) => {
    try {
      
        const filename = event.queryStringParameters.name
        const filepath = `uploaded/${filename}`

        const params = {
            Bucket: BUCKET,
            Key: filepath,
            Expires: 60,
            ContentType: 'text/csv'
        };
        const url = await s3.getSignedUrlPromise('putObject', params)
       
        return successResponse(url);
    } catch (error) {
        return errorResponse(error);
    }
}