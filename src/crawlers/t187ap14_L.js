const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const axios = require('axios')
const mysql = require('mysql')
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

// ... [其他程式碼保持不變]

async function fetchData() {
  try {
    const response = await axios.get(API_URL)
    const data = response.data

    if (data && Array.isArray(data)) {
      const results = data.map((item) => {
        const westernDate = convertToWesternDate(item['出表日期'])
        return {
          stock_id: parseInt(item['公司代號']), // 使用code作為stock_id
          date: westernDate,
          year: parseInt(item['年度']),
          quarter: parseInt(item['季別']),
          v_p: sanitizeDecimalValue(item['基本每股盈餘(元)']),
          b_p: sanitizeDecimalValue(item['普通股每股面額']),
          revenue: sanitizeDecimalValue(item['營業收入']),
          profit: sanitizeDecimalValue(item['營業利益']),
          income_expenses: sanitizeDecimalValue(item['營業外收入及支出']),
          profit_after_price: sanitizeDecimalValue(item['稅後淨利']),
          create_date: new Date(),
          update_date: new Date(),
        }
      })

      results.forEach((result) => {
        const query = 'INSERT INTO industry_eps SET ?'
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

function sanitizeDecimalValue(str) {
  if (str === '--') return null
  const match = str.match(/(\d+\.\d+)/)
  return match ? parseFloat(match[1]) : null
}

// ... [其他程式碼保持不變]

function convertToWesternDate(date) {
  const year = parseInt(date.substring(0, 3), 10) + 1911
  const month = date.substring(3, 5)
  const day = date.substring(5, 7)
  return `${year}-${month}-${day}`
}

function extractDecimalValue(str) {
  const match = str.match(/(\d+\.\d+)/)
  return match ? parseFloat(match[1]) : null
}

fetchData()
