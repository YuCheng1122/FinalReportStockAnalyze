const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const axios = require('axios')
const mysql = require('mysql2')

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

async function fetchTAIEXData(year, month) {
  const lastDay = new Date(year, month, 0).getDate()
  const formattedDate = `${year}${String(month).padStart(2, '0')}${String(lastDay).padStart(2, '0')}`
  const url = `https://www.twse.com.tw/rwd/en/TAIEX/MI_5MINS_HIST?date=${formattedDate}&response=json&_=170039420045`

  try {
    const response = await axios.get(url)
    if (response.data.stat === 'OK') {
      const data = response.data.data
      data.forEach((row) => {
        const [date, openingIndex, highestIndex, lowestIndex, closingIndex] = row
        const query = 'INSERT INTO taiex_data SET ?'
        const values = {
          date: date,
          opening_index: parseFloat(openingIndex.replace(/,/g, '')),
          highest_index: parseFloat(highestIndex.replace(/,/g, '')),
          lowest_index: parseFloat(lowestIndex.replace(/,/g, '')),
          closing_index: parseFloat(closingIndex.replace(/,/g, '')),
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
      console.log(`Failed to fetch data for ${formattedDate}`)
    }
  } catch (error) {
    console.error(`Error fetching data for ${formattedDate}:`, error)
  }

  //3 Mins
  await new Promise((resolve) => setTimeout(resolve, 3000))
}

async function fetchAllData(years) {
  for (const year of years) {
    for (let month = 1; month <= 12; month++) {
      await fetchTAIEXData(year, month)
    }
  }
  await Promise.all(pendingQueries)
}

const years = [2018, 2019, 2020, 2021, 2022, 2023] // Years to be processed

fetchAllData(years)
  .then(() => {
    connection.end()
  })
  .catch((error) => {
    console.error('An error occurred:', error)
    connection.end()
  })
