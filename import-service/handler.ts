import AWS from 'aws-sdk';
import * as handlers from './src/handlers';

const s3 = new AWS.S3({ region: 'us-east-1' });



export const getAllProducts = handlers.importProductsFile({
    s3,
});