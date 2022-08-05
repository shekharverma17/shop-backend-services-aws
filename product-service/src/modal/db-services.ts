import { ProductServiceInterface, ProductInterface } from './products';
import products from './products-data.json';

import { DBServicesInterface } from "./db"
import { dbQuery, createDBQuery } from './db-helper'
//const pg = require('pg')
//import pg from 'pg'
//const { Pool, Client } = require('pg');
const pg = require('pg')
//const pool = new pg.Pool()
// const pool = new pg.Pool({
//     host: 'localhost',
//     user: 'database-user',
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   })
//   const pool = new pg.Pool({
//     username: 'postgres_admin',
//     password: 'rds097428',
//     database: 'cloud_x',
//     host: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
//     port: '5432',
// });


const { Pool } = require('pg')
const pool = new Pool({
  host: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
  user: 'postgres_admin',
  password: 'rds097428',
  database: 'cloud_x',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

//const { Pool, Client } = require('pg')
// class DBServices implements DBServicesInterface {
//     constructor(brand) {  // Constructor
//         this.client = brand;
//       }
   
//     connect() {  
//         var dbConfig = {
//             username: '<username>',
//             password: '<password>',
//             database: '<database>',
//             host: '<db-endpoint>',
//         };
//         client = new pg.Client(dbConfig);
//         client.connect();  
//     }
    
//     query() {}
    
// }
//export const { getProductById, getProducts } = new DBServices()

class DBServices implements DBServicesInterface {

    connect() {  

    }
    // async queryy (q) {
    //     const client = await pool.connect()
    //     let res
    //     try {
    //       await client.query('BEGIN')
    //       try {
    //         res = await client.query(q)
    //         await client.query('COMMIT')
    //       } catch (err) {
    //         await client.query('ROLLBACK')
    //         throw err
    //       }
    //     } finally {
    //       client.release()
    //     }
    //     return res
    //   }

    async fetchProduct(id: string){
        try {
            //const client = await pool.connect()
//console.log("===client===", client);
           const result = await dbQuery(`SELECT p.id, p.title, p.description, p.price, s.count FROM products p, stocks s 
           WHERE p.id=s.product_id 
           and p.id = '${id}'`)
        console.log(JSON.stringify(result))
            
           //callback(null, response);
           return Promise.resolve(result);
          } catch (err) {
            console.log('Database ' + err)
            return Promise.resolve(err);
            //callback(null, 'Database ' + err);
          }
      }
      
      async createProduct(productData){
        try {
            //const client = await pool.connect()
//console.log("===client===", client);
        //    const result = await dbQuery(`SELECT p.id, p.title, p.description, p.price, s.count FROM products p, stocks s 
        //    WHERE p.id=s.product_id 
        //    and p.id = '${id}'`)

           const result = await createDBQuery(productData)
         

        console.log(JSON.stringify(result))
            
           //callback(null, response);
           return Promise.resolve(result);
          } catch (err) {
            console.log('Database ' + err)
            return Promise.resolve(err);
            //callback(null, 'Database ' + err);
          }
      }

      async query(){
        try {
            //const client = await pool.connect()
//console.log("===client===", client);
           const result = await dbQuery("select * from products")
        // console.log(JSON.stringify(result[0]))
            
           //callback(null, response);
           return Promise.resolve(result);
          } catch (err) {
            console.log('Database ' + err)
            return Promise.resolve(err);
            //callback(null, 'Database ' + err);
          }
      }
      

//     async query() {
//         // DB_NAME: 'cloud_x',
//         // DB_USER: 'postgres_admin',
//         // DB_PASS: 'rds097428',
//         // DB_PORT: '5432',
//         // DB_HOST: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
//         var dbConfig = {
//             username: 'postgres_admin',
//             password: 'rds097428',
//             database: 'cloud_x',
//             host: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
//             port: '5432',
//         };



// console.log("inside query=======");


// const pool = new Pool({
//     username: 'postgres_admin',
//     password: 'rds097428',
//     database: 'cloud_x',
//     host: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
//     port: '5432',
// });



// const getAllUsers = async () => {
 
// await pool.connect((err, client, release) => {
//     if (err) {
//         console.log(err);
//     } else {
//         return console.log("no error");
//     }
// })
// };

// getAllUsers();
//     //     const pool = new Pool({
//     //         username: 'postgres_admin',
//     //         password: 'rds097428',
//     //         database: 'cloud_x',
//     //         host: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
//     //       port: 5432,
//     //     })
//     //     console.log("inside 2 query=======");
//     //    await pool.query('SELECT NOW()', (err, res) => {
//     //     console.log("inside SELECT=======");
//     //     return console.log(err, res)
//     //       pool.end()
//     //     })
//     //     console.log("inside 3 query=======");
//     //     const client = new Client({
//     //         username: 'postgres_admin',
//     //         password: 'rds097428',
//     //         database: 'cloud_x',
//     //         host: 'cloudx-aws-db.cdduwpppdgo1.us-east-1.rds.amazonaws.com',
//     //       port: 5432,
//     //     })
//     //     console.log("inside 4query=======");
     
//     //     client.connect()
//     //     await client.query('SELECT NOW()', (err, res) => {
//     //         console.log("inside client SELECT=======");
//     //         return console.log(err, res)
//     //       return Promise.resolve(res);
//     //       client.end()
//     //     })


//         console.log("inside 5 query=======");
     
//         return Promise.resolve("success");


//        //let client = new pg.Client(dbConfig);
//       // const pool = new Pool({ ...dbConfig });

//     //    await pool.connect((err) => {
//     //     if (err) {
//     //         console.log(err);
//     //     } else {
//     //        // const res = client.query("SELECT * FROM products");
    
//     //         return console.log("no error");
//     //     }
//     // })
    
//     //const res = await pool.query('SELECT * FROM products')
//     //return Promise.resolve(res);
//    // return Promise.resolve("success");
//     //    try {
//     //     await client.connect();
//     //     //context.callbackWaitsForEmptyEventLoop = false;
//     //     const res = await client.query("SELECT * FROM products");
//     //     client.end();
//     //     console.log(res);
//     //     return Promise.resolve(res);
//     //     //send the response
//     //    // callback(null,"Some Response")
//     // }
//     // catch (err) {
//     //     console.log(err);
//     //    // client.end();
//     //    await client.end();
//     //    return Promise.resolve(err);
//     //    // callback(err)
//     // }
        
//     }
    
}
export const { query, fetchProduct, createProduct } = new DBServices()
export { DBServices };