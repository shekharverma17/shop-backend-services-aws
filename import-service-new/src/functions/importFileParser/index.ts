import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'uploaded',
        existing: true,
        event: 's3:ObjectCreated:*',
        rules:[{'suffix': '.csv'}] 
      },
    },
  ]
}
