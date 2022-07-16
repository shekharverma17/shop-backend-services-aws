import { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { getProducts } from '../../services/product-service'
import { mockDBfunction } from '../mock'

const event = {};
const context = {} as Context;
const callback = null as Callback;

jest.mock('../../services/product-service', () => ({
    getProducts: jest.fn(),
}));
const getProductsMock = getProducts as jest.MockedFunction<typeof getProducts>;


describe('Verify getProducts', () => {
  it('getProducts Handler should return products', async () => {
    const mockFnReturnValueOnce = mockDBfunction("getProducts");
    getProductsMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));

        const result = await handler(event, context, callback);
        const response = JSON.parse(result.body);

        expect(result.statusCode).toEqual(200);
        expect(Array.isArray(response)).toBe(true);
        expect(typeof response[0]).toBe('object');
        expect(response.length).toBeGreaterThanOrEqual(1);

  });
  it('getProducts Handler should return empty records', async () => {
    getProductsMock.mockReturnValueOnce(Promise.resolve([]));
    const result = await handler(event, context, callback);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toBe('{"message":"Product not found"}');

  });

  it('getProducts Handler should return Error', async () => {
    getProductsMock.mockImplementation(() => {
        throw new Error("db error!");
      });
    const result = await handler(event, context, callback);

    expect(result.statusCode).toEqual(500);
    expect(result.body).toBe('{"message":"db error!"}');

  });
});