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

const targetStockIds = ['2408', '2454', '3231', '3443', '2912', '3008', '3045', '4904', '4938',  '6505', '9904', '1227',
'1319', '1440', '1477', '1504', '1536', '1605', '1707', '1717', '1722', '1723', '1789', '1802', '2015', '2049', '2059', '2101', '2103', '2106', '2201', '2204', '2206', '2231', '2313', '2327', '2345', '2347', '2352', '2353', '2355', '2356', '2360', '2362', '2376', '2377', '2379', '2383', '2385', '2392', '2408',  '2449', '2451', '2498', '2542', '2603', '2609', '2610', '2615', '2618', '2707', '2809', '2812', '2867', '2903', '2915', '3034', '3037', '3044', '3189', '3231', '3682', '4958', '5522', '6176', '6239', '6269', '6285', '6414', '6456', '8150', '8454', '8464', '9907', '9910', '9917', '9921', '9933', '9938', '9945','1101', '1102', '1216', '1301', '1303', '1326', '1402', '1476', '2002', '2105', '2207', '2301', '2303', '2308', '2317', '2324', '2330', '2354', '2357', '2382', '2395', '2408', '2409', '2412', '2474']


const targetYears = [2023]

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
