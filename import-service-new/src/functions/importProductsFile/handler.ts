import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { errorResponse, successResponse } from "../../../src/utils/responseBuilder";
import AWS from 'aws-sdk';
const s3 = new AWS.S3({ region: 'us-east-1' });
const BUCKET = 'node-js-aws-s3-task5-test123'
var AWSMock = require('mock-aws-s3');
//serverless invoke local --function importProductsFile --data '{ "queryStringParameters": {"name":"product.csv"}}'
const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

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

};

export const main = middyfy(importProductsFile);
