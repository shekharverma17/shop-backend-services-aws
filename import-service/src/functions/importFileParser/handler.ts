import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({ region: 'us-east-1' });
const sqs = new AWS.SQS();
const BUCKET = 'node-js-aws-s3-task5'
import csv from 'csv-parser';

const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        console.log(`Lambda invocation with: ${JSON.stringify(event)}`);
        const s3Instance = s3;
        const bucketName = BUCKET
        const uploadFolderName = 'uploaded'
        const parsedForlderName = 'parsed'
        const QueueUrl =  process.env.SQS_QUEUE_URL

        const fileRecords = event.Records.filter(
            (record) => !!record.s3.object.size
        );
        console.log(`fileRecords: ${JSON.stringify(fileRecords)}`)
        for (const record of fileRecords) {
            const {
                s3: {
                    bucket: { name: bucketName },
                    object: { key: objectKey },
                },
            } = record;

            console.log(`
                RECORD\n
                ${JSON.stringify({
                    Bucket: bucketName,
                    CopySource: objectKey,
                    Key: objectKey.replace(uploadFolderName, parsedForlderName),
                })}
                \n
                ${JSON.stringify({ Bucket: bucketName, Key: objectKey })}
                \n
            `);

            const objectReadStream = s3Instance
                .getObject({ Bucket: bucketName, Key: objectKey })
                .createReadStream();
            const csvParsingStream = objectReadStream.pipe(csv());

            await new Promise((resolve, reject) => {
                csvParsingStream
                    .on("data", (data) => {
                        console.log(JSON.stringify({Bucket: bucketName, Key: objectKey, ParsedRow: data, }) );
                        sqs.sendMessage(
                            {
                              QueueUrl,
                              MessageBody: JSON.stringify(data),
                            },
                            (error) => {
                              if (error) {
                                console.log(`Error sending message: ${error}`);
                              } else {
                                console.log(`Message sent to SQS: ${JSON.stringify(data)}`);
                              }
                            }
                          )

                    }).on('end', async () => {
                            console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);                   
                            await s3.copyObject({
                                Bucket: BUCKET,
                                CopySource: `${BUCKET}/${record.s3.object.key}`,
                                Key: record.s3.object.key.replace('uploaded', 'parsed')
                            }).promise();
                    
                    console.log(`Copied into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);

              await s3
                .deleteObject({
                  Bucket: BUCKET,
                  Key: record.s3.object.key,
                })
                .promise()
              console.log('file succesfully removed from /uploaded folder')

                resolve
                 }).on("error", reject);
            });
        }
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Origin': '*'
               },
            }
    } catch (error) {
        console.log(`
            ERROR\n
            ${error.message}
            \n
            ${JSON.stringify(error)}
            \n
            ERROR END
            \n
        `);
        return {
            statusCode: 500
            }
    }

};

export const main = middyfy(importFileParser);
