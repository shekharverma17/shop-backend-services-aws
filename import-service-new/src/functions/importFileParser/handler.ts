import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({ region: 'us-east-1' });
const BUCKET = 'node-js-aws-s3-task5-test123'

import csv from 'csv-parser';

//serverless invoke local --function importFileParser --data '{ "queryStringParameters": {"name":"product.csv"}}'
const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    event.Records.forEach(record => {        
        const s3Stream = s3.getObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
        }).createReadStream();

        s3Stream.pipe(csv())
            .on('data', (data) => {
                console.log(data);
            })
            .on('end', async () => {
                console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

                await s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: `${BUCKET}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                console.log(`Copied into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
            });
    });

    return {
        statusCode: 200
    }
};

export const main = middyfy(importFileParser);
