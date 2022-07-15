import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { getProductById } from '../../services/product-service'
import { mockDBfunction } from '../mock'
// Import mock function from mock.js
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
const BUCKET = 'node-js-aws-s3-task5'

describe('Hello Handler', () => {
  it('should pass with mocked post request', async () => {
           expect("test").toEqual("test");
   
     });
  it('should pass with mocked post request', async () => {
  
 //   const context = {} as Context;
   // const callback = null as Callback;
    const action = "putObject";
    const mockSignedUrl = 'www.test.com';
    AWSMock.setSDKInstance(AWS);
    // AWSMock.mock('S3', 'getSignedUrlPromise', (_action, _params, callback) => {
    //         console.log('S3', 'getSignedUrl', 'mock called')
    //         callback(null, mockSignedUrl)
    //       })
          AWSMock.mock('S3','getSignedUrl', (_action,_params,callback) => {
            return callback(null, mockSignedUrl);
          });
      
          const filename = 'product.csv'
          const filepath = `uploaded/${filename}`

          const params = {
            Bucket: BUCKET,
            Key: filepath,
            Expires: 60,
            ContentType: 'text/csv'
        };
       
const s3 = new AWS.S3({ region: 'us-east-1' });
        const url = await s3.getSignedUrlPromise('putObject', params)
       
        console.log("response===", url);

        expect(url).toEqual(mockSignedUrl);

  });
});