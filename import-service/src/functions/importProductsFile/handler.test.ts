import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
const BUCKET = 'node-js-aws-s3-task5'

describe('Hello Handler', () => {
  it('should pass with mocked post request', async () => {
    const mockSignedUrl = 'www.test.com';
    AWSMock.setSDKInstance(AWS);
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
        expect(url).toEqual(mockSignedUrl);

  });
});