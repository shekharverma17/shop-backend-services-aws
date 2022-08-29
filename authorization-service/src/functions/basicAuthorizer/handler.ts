import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const basicAuthorizer: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  console.log(`Lambda invocation with: ${JSON.stringify(event)}`);
  try {
        const { type, authorizationToken, methodArn } = event;
        console.log('Event with token', authorizationToken);

        if (type !== 'TOKEN') {
          throw new Error('Error: token value is missing');
        }
        const encodedCredentials = authorizationToken.replace('Bearer ', '');
        const buff = Buffer.from(encodedCredentials, 'base64');
        const credentials = buff.toString('utf-8').split(':');
        const username = credentials[0];
        const password = credentials[1];

        const isCredentialsValid = username === process.env.AUTH_NAME && password === process.env.AUTH_PASSWORD;

        const effect = isCredentialsValid ? 'Allow' : 'Deny';
        console.log(`Generating policy...`)
        return generatePolicy(encodedCredentials, methodArn, effect);
    } catch(error) {
      console.log(`ERROR: ${JSON.stringify(error)}`)
      return {
        statusCode: 403,
        error: error.message,
      }
    }
};
const generatePolicy = (
  principalId,
  resource,
  effect
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});
export const main = middyfy(basicAuthorizer);
