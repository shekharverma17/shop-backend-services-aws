//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: { "Fn::GetAtt": ["ProductQueue", "Arn"] },
        batchSize: 5,
      },
    },
  ],
};
