import { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { fetchProductById } from '../../services/product-service'
import { mockDBfunction } from '../mock'

const event = {
  pathParameters: {
      productId: "1"
  }
} as any
const context = {} as Context;
const callback = null as Callback;

jest.mock('../../services/product-service', () => ({
  fetchProductById: jest.fn(),
}));
const fetchProductByIdMock = fetchProductById as jest.MockedFunction<typeof fetchProductById>

describe('Verify getProductsById Handler', () => {
  it('Should return product object', async () => {
        const mockFnReturnValueOnce = mockDBfunction("fetchProductById", false, false, "1");
        fetchProductByIdMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));        
        const result = await handler(event, context, callback);
        const response = JSON.parse(result.body);

        expect(result.statusCode).toEqual(200);
        expect(typeof response).toBe('object');
        expect(response.id).toEqual("1");

  });
  it('Should return empty record 404', async () => {
      fetchProductByIdMock.mockReturnValueOnce(Promise.resolve(null));
      const result = await handler(event, context, callback);

      expect(result.statusCode).toEqual(404);
      expect(result.body).toBe('{"message":"Product not found"}');
  });

  it('Should return error', async () => {
    fetchProductByIdMock.mockImplementation(() => {
        throw new Error("db error!")
    });
    const result = await handler(event, context, callback)   

    expect(result.statusCode).toEqual(500)
    expect(result.body).toBe('{"message":"db error!"}')
    jest.clearAllMocks()

  });
});