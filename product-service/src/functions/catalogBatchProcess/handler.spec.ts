import { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { getProductById } from '../../services/product-service'
import { mockDBfunction } from '../mock'
// Import mock function from mock.js
import { createProductService } from '../../services/product-service'
jest.mock('../../services/product-service', () => ({
    getProductById: jest.fn(),
}));

const context = {} as Context;
const callback = null as Callback;
jest.mock('../../services/product-service', () => ({
  createProductService: jest.fn(),
}));
const createProductServiceMock = createProductService as jest.MockedFunction<typeof createProductService>

// const mockSNSPublish = jest.fn();
// jest.mock('aws-sdk', () => {
//   return {
//     SNS: jest.fn(() => ({
//       publish: mockSNSPublish,
//     })),
//   };
// });

const mockSnsSend = jest.fn();
jest.mock('@aws-sdk/client-sns', () => ({
  SNSClient: jest.fn(() => ({
    send: mockSnsSend
  })),
  PublishCommand: function(){
    return jest.fn().mockImplementation(function () {
    })
  }
})
);

const mockedSQSRecords = [
  {
    body: '{"title":1}',
  },
  {
    body: '{"title":2}',
  },
  {
    body: '{"title":3}',
  },
];

describe('Hello Handler', () => {
  it('should return status code 200', async () => {
    const sqsEvent = {
      Records: mockedSQSRecords,
    } as any;

    // mockSNSPublish.mockImplementation((_params) => ({
    //   promise() {
    //     return Promise.resolve();
    //   },
    // }));
    const mockFnReturnValueOnce = mockDBfunction("fetchProductById", false, false, "27e70fdb-bb05-4dec-a993-24cd96de19a6");
    createProductServiceMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));        
    const resultFromHandler = await handler(sqsEvent, context, callback);

    if (resultFromHandler) {
      const { statusCode } = resultFromHandler;

      expect(statusCode).toEqual(200);
      expect(mockSnsSend).toBeCalled();
    }
  });

  it('should call sns.publish method', async () => {
    const sqsEvent = {
      Records: mockedSQSRecords,
    } as any;

    // mockSNSPublish.mockImplementation((_params) => ({
    //   promise() {
    //     return Promise.resolve();
    //   },
    // }));

    const resultFromHandler = await handler(sqsEvent, context, callback);

    if (resultFromHandler) {
      expect(mockSnsSend).toBeCalled();
    }
  });
});