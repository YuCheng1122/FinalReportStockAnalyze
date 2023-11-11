const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const axios = require('axios')
const mysql = require('mysql')

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

const targetStockIds = ['2330', '2303', '2408', '2454', '3231', '3443']
const targetYears = [2020, 2021, 2022, 2023]

async function fetchData() {
  let pendingQueries = []

  try {
    for (const year of targetYears) {
      for (const stockId of targetStockIds) {
        for (let month = 1; month <= 12; month++) {
          const lastDayOfMonth = getLastDayOfMonth(year, month)
          const API_URL = `https://www.twse.com.tw/rwd/en/afterTrading/BWIBBU?date=${formatDate(lastDayOfMonth)}&stockNo=${stockId}&response=json&_=1699498449548`

          try {
            const response = await axios.get(API_URL)
            if (response.data.stat === 'OK' && Array.isArray(response.data.data)) {
              response.data.data.forEach((item) => {
                const [date, dividend_yield, dividend_year, p_e_ratio, p_b_ratio, fiscal_year_quarter] = item
                const result = {
                  stock_id: stockId,
                  date: new Date(date.replace('/', '-')),
                  dividend_yield: parseFloat(dividend_yield) || null,
                  p_e_ratio: parseFloat(p_e_ratio) || null,
                  p_b_ratio: parseFloat(p_b_ratio) || null,
                  create_date: new Date(),
                  update_date: new Date(),
                }

                const query = 'INSERT INTO BWIBBU_ALL SET ?'
                const queryPromise = queryAsync(query, result)
                pendingQueries.push(queryPromise)
              })
            } else {
              console.error('No data found for stockId:', stockId, 'in year:', year, 'month:', month)
            }
          } catch (httpError) {
            console.error(`HTTP error for stockId: ${stockId}, year: ${year}, month: ${month}`, httpError)
          }
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      }
    }

    await Promise.all(pendingQueries)
    connection.end()
  } catch (error) {
    console.error('Error during data fetching or database operation:', error)
  }
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0)
}

function formatDate(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
}

function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

fetchData()
  .then(() => console.log('Data fetching completed.'))
  .catch((error) => console.error('Error during data fetching:', error))
