import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { createProductService } from '../../services/product-service'
import { mockDBfunction } from '../mock'

const event = {
  body:{title:"iPhone13", description:"An apple 13 mobile which is nothing like apple", price: 12, count: 11}
} as any
const context = {} as Context;
const callback = null as Callback;
jest.mock('../../services/product-service', () => ({
  createProductService: jest.fn(),
}));
const createProductServiceMock = createProductService as jest.MockedFunction<typeof createProductService>

describe('Hello Handler', () => {
  it('Should create product', async () => {
    const mockFnReturnValueOnce = mockDBfunction("fetchProductById", false, false, "27e70fdb-bb05-4dec-a993-24cd96de19a6");
    createProductServiceMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));        
    const result = await handler(event, context, callback);
    const response = JSON.parse(result.body);

    expect(result.statusCode).toEqual(200);
    expect(typeof response[0]).toBe('object');
    expect(response[0].id).toEqual("27e70fdb-bb05-4dec-a993-24cd96de19a6");

});

it('Should return error 400', async () => {
  const invalidEvent = {
    body:{title:"iPhone13", description:"An apple 13 mobile which is nothing like apple"}
  } as any
  createProductServiceMock.mockReturnValueOnce(Promise.resolve([]));
  const result = await handler(invalidEvent, context, callback);

  expect(result.statusCode).toEqual(400);
  expect(result.body).toBe('{"message":"Product data is invalid!"}');
});

});