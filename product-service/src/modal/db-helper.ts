const { Pool } = require('pg')
const DBconnect = async () => {
  const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })  
  try {
    return await pool.connect()
    } catch (error) {
      throw error
    }
}

async function dbQuery(q) {
    let res
    const client = await DBconnect()
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(q)
        await client.query('COMMIT')
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      }
    } finally {
      client.release()
    }
    return res
  }

  async function createDBQuery({title, description, price, count}) {
    const client = await DBconnect()
    let result
    try {
      await client.query('BEGIN')
      try {
        result = await client.query(`INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING *`, [title, description, price])
        const { rows } = result
        await client.query(`INSERT INTO stocks (product_id, count) VALUES ($1, $2) RETURNING *`, [rows[0].id, count])
        await client.query('COMMIT')
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      }
    } finally {
      client.release()
    }
    return result
  }

  export { dbQuery, createDBQuery }