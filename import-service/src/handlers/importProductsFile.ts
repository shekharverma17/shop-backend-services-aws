//const BUCKET = process.env.BUCKET;
const BUCKET = 'node-js-aws-s3-task5'
import { errorResponse, successResponse } from "../utils/responseBuilder";

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