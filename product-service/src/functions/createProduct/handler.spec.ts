import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { getProductById } from '../../services/product-service'
import { mockDBfunction } from '../mock'
// Import mock function from mock.js

jest.mock('../../services/product-service', () => ({
    getProductById: jest.fn(),
}));
describe('Hello Handler', () => {
  it('should pass with mocked post request', async () => {
    // const event = {
    //   headers: { 'Content-Type': 'application/json' },
    //   body: '{"name": "Frederic"}',
    // };
    const context = {} as Context;
    const callback = null as Callback;
    //const addListenerMock = getProductById as jest.MockedFunction<typeof getProductById>;
   // const mockFnReturnValueOnce = mockDBfunction("getProductById");
    //addListenerMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));

    // try {
        const event = {
            pathParameters: {
                productId: 1
            }
        } as any

        const result = await handler(event, context, callback);
        const response = JSON.parse(result.body);
        console.log("response===", response);

        
           // expect(Array.isArray(response)).toBe(true);
           expect(typeof response).toBe('object');
           //expect(response.id).toEqual(1);
          // expect(response.title).toEqual("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
            //expect(response.length).toBeGreaterThanOrEqual(1);  

        
 

  });
  it('should return empty records', async () => {
    const event = {
        pathParameters: {
            productId: 99
        }
    } as any
    const context = {} as Context;
    const callback = null as Callback;
   // const addListenerMock = getProducts as jest.MockedFunction<typeof getProducts>;
   // const mockFnReturnValueOnce = mockDBfunction("getProducts", false, true);
    //addListenerMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));

        const result = await handler(event, context, callback);
       // const response = JSON.parse(result.body);
       // console.log(result);
        expect(result.statusCode).toEqual(404);
        expect(result.body).toBe('{"message":"Product not found"}');


  });

  it('Error', async () => {
    //jest.clearAllMocks();
    
    const event = {
        pathParameters: {
            productId: "1"
        }
    } as any
    const context = {} as Context;
    const callback = null as Callback;


            const addListenerMock = getProductById as jest.MockedFunction<typeof getProductById>;
         //   const mockFnReturnValueOnce = mockDBfunction("getProducts", true);
           //console.log(mockFnReturnValueOnce);
         //  addListenerMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));
           addListenerMock.mockImplementation(() => {
            throw new Error("db error2!");
          });
                const result = await handler(event, context, callback);
               // const response = JSON.parse(result.body);
               //expect(result.statusCode).toEqual(500);
    
               expect(result.statusCode).toEqual(500);
               expect(result.body).toBe('{"message":"db error2!"}');
               jest.clearAllMocks()

  });
});