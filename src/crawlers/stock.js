const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const axios = require('axios')
const mysql = require('mysql2')
const API_URL = 'https://openapi.twse.com.tw/v1/opendata/t187ap14_L'

const dbConfig = {
  host: 'localhost',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
}

console.log(dbConfig)
console.log(process.env.DEVELOPMENT_DB_HOST)

const connection = mysql.createConnection({
  ...dbConfig,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
})

async function fetchData() {
  try {
    const response = await axios.get(API_URL)
    const data = response.data

    if (data && Array.isArray(data)) {
      const results = data.map((item) => {
        return {
          stock_id: item['公司代號'],
          name: item['公司名稱'],
          industry: item['產業別'],
        }
      })

      results.forEach((result) => {
        const query = 'INSERT INTO stock SET ?'
        connection.query(query, result, (error, results, fields) => {
          if (error) {
            console.error('Error inserting data:', error)
            return
          }
          console.log('Inserted:', results.insertId)
        })
      })

      connection.end()
      console.log(results)
      return results
    } else {
      console.error('No data found')
      return []
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

fetchData()
