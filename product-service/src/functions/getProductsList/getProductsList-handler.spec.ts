import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { getProducts } from '../../services/product-service'
import { mockDBfunction } from '../mock'
// Import mock function from mock.js


jest.mock('../../services/product-service', () => ({
    getProducts: jest.fn(),
}));

describe('Hello Handler', () => {
  it('should pass with mocked post request', async () => {
    const event = {
      headers: { 'Content-Type': 'application/json' },
      body: '{"name": "Frederic"}',
    };
    const context = {} as Context;
    const callback = null as Callback;
    const addListenerMock = getProducts as jest.MockedFunction<typeof getProducts>;
    const mockFnReturnValueOnce = mockDBfunction("getProducts");
    addListenerMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));

    // try {
        const result = await handler(event, context, callback);
        const response = JSON.parse(result.body);
        console.log(result);

        if(result.statusCode == 200){
    
            expect(Array.isArray(response)).toBe(true);
            expect(typeof response[0]).toBe('object');
            expect(response.length).toBeGreaterThanOrEqual(1);  

        } else if(result.statusCode == 404){

            expect(response).toMatchObject({
                body:
                  '{"message: "Product not found""}',
                statusCode: 400,
              });

        } else { 
            expect(result.statusCode).toEqual(500);
        }
 

  });
  it('should return empty records', async () => {
    const event = {
      headers: { 'Content-Type': 'application/json' },
      body: '{"name": "Frederic"}',
    };
    const context = {} as Context;
    const callback = null as Callback;
    const addListenerMock = getProducts as jest.MockedFunction<typeof getProducts>;
    const mockFnReturnValueOnce = mockDBfunction("getProducts", false, true);
    addListenerMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));

        const result = await handler(event, context, callback);
       // const response = JSON.parse(result.body);
       // console.log(result);
        expect(result.statusCode).toEqual(404);
        expect(result.body).toBe('{"message":"Product not found"}');


  });

  it('Error', async () => {
    //jest.clearAllMocks();
    
    const event = {
      headers: { 'Content-Type': 'application/json' },
      body: '{"name": "Frederic"}',
    };
    const context = {} as Context;
    const callback = null as Callback;

    const addListenerMock = getProducts as jest.MockedFunction<typeof getProducts>;
    const mockFnReturnValueOnce = mockDBfunction("getProducts", true);
   console.log(mockFnReturnValueOnce);
 //  addListenerMock.mockReturnValueOnce(Promise.resolve(mockFnReturnValueOnce));
   addListenerMock.mockImplementation(() => {
    throw new Error("db error!");
  });
        const result = await handler(event, context, callback);
       // const response = JSON.parse(result.body);
       expect(result.statusCode).toEqual(500);
       expect(result.body).toBe('{"message":"db error!"}');

  });
});