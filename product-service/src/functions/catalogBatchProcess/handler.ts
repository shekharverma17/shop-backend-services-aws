import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"
import { middyfy } from '../../libs/lambda';
import schema from './schema';
import { createProductService } from '../../services/product-service'

const catalogBatchProcess: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(`sqs event: ${JSON.stringify(event)}`)
  const sns = new SNSClient({ region: 'us-east-1' });
  try {
    for (let record of event.Records) {
      const newProductData = JSON.parse(record.body);
      console.log(`sqs event Product Data: ${JSON.stringify(newProductData)}`)
      await createProductService(newProductData);

      await sns.send(new PublishCommand({
        Subject: 'New Files Added to Catalog',
        Message: JSON.stringify(newProductData),
        TopicArn: process.env.PRODUCTS_TOPIC_ARN,
        MessageAttributes: {
            price: {
              DataType: "Number", 
              StringValue: newProductData.price,
            }
        }
    }))

    }
    console.log('Email with new products has been sent');
    
    return {
      statusCode: 200,
    }

    }catch (error) {
	    console.log(error)
      return {
        statusCode: 500,
        error: error.message,
      }
    }
};

export const main = middyfy(catalogBatchProcess);