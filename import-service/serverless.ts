import type { AWS } from '@serverless/typescript';
import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service-test123',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-plugin-existing-s3'], ///plugins:- serverless-plugin-existing-s3
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'us-east-1',
    // deploymentBucket: 'node-js-aws-s3-task5-test123',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: ['arn:aws:s3:::node-js-aws-s3-task5']
      },
      {
       Effect: 'Allow',
       Action: ['s3:*'],
       Resource: ['arn:aws:s3:::node-js-aws-s3-task5/*']
     },
     {
      Effect: 'Allow',
      Action: ['s3:PutBucketNotification'],
      Resource: ['*']
     },
     ]
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
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
};

module.exports = serverlessConfiguration;
