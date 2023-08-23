const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const axios = require('axios')
const mysql = require('mysql')
const API_URL = 'https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX'

const dbConfig = {
  host: 'localhost',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
}

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
          index: item['指數'] || null,
          closing_index: parseFloat(item['收盤指數']) || null,
          rise_and_fall: item['漲跌'] || null,
          point_change: parseFloat(item['漲跌點數']) || null,
          percentage_change: parseFloat(item['漲跌百分比']) || null,
          special_handling_note: item['特殊處理註記'] || null,
          create_date: new Date(),
          update_date: new Date(),
        }
      })

      results.forEach((result) => {
        const query = 'INSERT INTO mi_index SET ?'
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
  .then((data) => {
    console.log('Data fetched successfully')
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })
