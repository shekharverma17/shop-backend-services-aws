import { handlerPath } from '@libs/handler-resolver';

// export default {
//   handler: `${handlerPath(__dirname)}/handler.main`,
//   events: [
//     {
//       s3: {
//         bucket: 'uploaded',
//         existing: true,
//         event: 's3:ObjectCreated:*',
//        // rules:[{'suffix': '.csv'}] 
//         rules:
//         - prefix: 'uploaded/'
//         // rules:
//         //     - prefix: uploaded/
//         //   existing: true
//       },
//     },
//   ]
// }
const BUCKET_NAME = 'node-js-aws-s3-task5'
export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET_NAME,
        event: "s3:ObjectCreated:*",
        rules: [
          { prefix: `uploaded/` },
          { suffix: ".csv" },
        ],
        existing: true,
      },
    },
  ],
};