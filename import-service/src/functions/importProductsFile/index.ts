import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/import',
        cors: true,
        authorizer: {
          arn: 'arn:aws:lambda:us-east-1:003374823954:function:authorization-service-dev-basicAuthorizer',
          name: 'basicAuthorizer',
          type: 'TOKEN',
          identitySource: 'method.request.header.Authorization',
        },
      },
    },
  ],
}
