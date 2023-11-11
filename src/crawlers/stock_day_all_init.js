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

const stockCodes = ['2330', '2303', '2408', '2454', '3231', '3443']

// [
//   '1101',
//   '1102',
//   '1216',
//   '1301',
//   '1303',
//   '1326',
//   '1402',
//   '1476',
//   '2002',
//   '2105',
//   '2207',
//   '2301',
//   '2303',
//   '2308',
//   '2311',
//   '2317',
//   '2324',
//   '2325',
//   '2330',
//   '2354',
//   '2357',
//   '2382',
//   '2395',
//   '2408',
//   '2409',
//   '2412',
//   '2474',
//   '2801',
//   '2880',
//   '2881',
//   '2882',
//   '2883',
//   '2884',
//   '2885',
//   '2886',
//   '2887',
//   '2890',
//   '2891',
//   '2892',
//   '2912',
//   '3008',
//   '3045',
//   '3474',
//   '4904',
//   '4938',
//   '5880',
//   '6505',
//   '9904',
//   '1227',
//   '1262',
//   '1319',
//   '1440',
//   '1477',
//   '1504',
//   '1536',
//   '1589',
//   '1590',
//   '1605',
//   '1704',
//   '1707',
//   '1717',
//   '1722',
//   '1723',
//   '1789',
//   '1802',
//   '2015',
//   '2049',
//   '2059',
//   '2101',
//   '2103',
//   '2106',
//   '2201',
//   '2204',
//   '2206',
//   '2231',
//   '2313',
//   '2327',
//   '2345',
//   '2347',
//   '2352',
//   '2353',
//   '2355',
//   '2356',
//   '2360',
//   '2362',
//   '2376',
//   '2377',
//   '2379',
//   '2383',
//   '2385',
//   '2392',
//   '2408',
//   '2448',
//   '2449',
//   '2451',
//   '2498',
//   '2542',
//   '2603',
//   '2609',
//   '2610',
//   '2615',
//   '2618',
//   '2707',
//   '2809',
//   '2812',
//   '2823',
//   '2834',
//   '2845',
//   '2849',
//   '2867',
//   '2888',
//   '2903',
//   '2915',
//   '3034',
//   '3037',
//   '3044',
//   '3189',
//   '3231',
//   '3673',
//   '3682',
//   '4958',
//   '5264',
//   '5522',
//   '5871',
//   '6176',
//   '6239',
//   '6269',
//   '6285',
//   '6414',
//   '6415',
//   '6452',
//   '6456',
//   '8150',
//   '8454',
//   '8464',
//   '9907',
//   '9910',
//   '9914',
//   '9917',
//   '9921',
//   '9933',
//   '9938',
//   '9945',
// ] 

const years = [2019, 2020, 2021, 2022, 2023] // Changed 'year' to 'years'

let pendingQueries = []

async function queryAsync(query, values) {
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

async function fetchStockData(year, month, stockId) {
  const url = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${year}${String(month).padStart(2, '0')}01&stockNo=${stockId}`
  try {
    const response = await axios.get(url)
    if (response.data.stat === 'OK') {
      const data = response.data.data
      data.forEach((row) => {
        const [date, trade_volume, trade_value, opening_price, highest_price, lowest_price, closing_price, change, transaction] = row
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${date.split('/')[2]}`
        const query = 'INSERT INTO stock_day_all SET ?'
        const values = {
          date: formattedDate,
          stock_id: stockId,
          trade_volume: parseInt(trade_volume.replace(/,/g, ''), 10),
          trade_value: parseInt(trade_value.replace(/,/g, ''), 10),
          opening_price: parseFloat(opening_price),
          highest_price: parseFloat(highest_price),
          lowest_price: parseFloat(lowest_price),
          closing_price: parseFloat(closing_price),
          change: parseFloat(change),
          transaction: parseInt(transaction),
          create_date: new Date(),
          update_date: new Date(),
        }
        const queryPromise = queryAsync(query, values)
          .then((results) => {
            console.log('Inserted:', results.insertId)
          })
          .catch((error) => {
            console.error('Error inserting data:', error)
          })
        pendingQueries.push(queryPromise)
      })
    } else {
      console.log(`Failed to fetch data for ${year}-${String(month).padStart(2, '0')}`)
    }
  } catch (error) {
    console.error(`Error fetching data for ${year}-${String(month).padStart(2, '0')}:`, error)
  }
}

async function fetchAllData(stockCodes) {
  for (const year of years) {
    console.log(`Fetching data for the year: ${year}`)
    await fetchYearlyData(year, stockCodes)
  }
}

async function fetchYearlyData(year, stockCodes) {
  for (const stockId of stockCodes) {
    console.log(`Fetching data for stock code: ${stockId}`)
    for (let month = 1; month <= 12; month++) {
      await fetchStockData(year, month, stockId)
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }
  await Promise.all(pendingQueries)
}

fetchAllData(stockCodes)
  .then(() => {
    connection.end()
  })
  .catch((error) => {
    console.error('An error occurred:', error)
    connection.end()
  })
