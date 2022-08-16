import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProductHandler from '@functions/createProduct'
import catalogBatchProcess from '@functions/catalogBatchProcess'

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PRODUCTS_TOPIC_ARN: {
        Ref: 'ProductsTopic'
      },
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_NAME: 'cloud_x',
      DB_USER: 'postgres_admin',
      DB_PASS: 'rds097428',
      DB_PORT: '5432',
      DB_HOST: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
  
    },
    iamRoleStatements: [
     {
      Effect: 'Allow',
      Action: ['sns:*'],
      Resource: ['arn:aws:sns:us-east-1:003374823954:createProductTopic']
     },
     ]
  },
  // import the function via paths
  functions: { hello, getProductsList, getProductsById, createProductHandler, catalogBatchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources:{
    Resources: {
      ProductQueue: {
				Type: "AWS::SQS::Queue",
				Properties: {
					QueueName: 'catalogItemsQueue',
          ReceiveMessageWaitTimeSeconds: 20,
				},
			},
      ProductsTopic:{
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        },         
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'shekhar17verma@gmail.com',
          Protocol: 'email',
          TopicArn: { Ref: 'ProductsTopic' },
        },
      },  
      SNSSubscriptionPriceMore1000: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'shekhar_verma@epam.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'ProductsTopic',
          },
          FilterPolicy: {
            price: [{ numeric: ['>=', 1000] }],
          },
        },
      }, 
    }
  },
};

module.exports = serverlessConfiguration;
