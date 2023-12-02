const path = require('path')
const axios = require('axios')
const mysql = require('mysql2')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

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

async function fetchDataForYears(startYear, endYear) {
  try {
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthStr = month.toString().padStart(2, '0')
        const API_URL = `https://www.twse.com.tw/en/exchangeReport/FMTQIK?response=json&date=${year}${monthStr}01`
        const response = await axios.get(API_URL)
        const data = response.data.data

        if (data && Array.isArray(data)) {
          const results = data.map((item) => {
            return {
              date: item[0],
              trade_volume: item[1].replace(/,/g, ''),
              trade_value: item[2].replace(/,/g, ''),
              transaction: item[3].replace(/,/g, ''),
              price: parseFloat(item[4].replace(/,/g, '')),
              change: parseFloat(item[5].replace(/,/g, '')),
              create_date: new Date(),
              update_date: new Date(),
            }
          })

          results.forEach((result) => {
            const query = 'INSERT INTO FMTQIK SET ?'
            connection.query(query, result, (error, results, fields) => {
              if (error) {
                console.error('Error inserting data:', error)
                return
              }
              console.log('Inserted:', results.insertId)
            })
          })

          console.log(`Data for ${year}-${monthStr} fetched successfully`)
        } else {
          console.error('No data found')
          const response = await axios.get(API_URL)
          console.log(`API response for ${year}-${monthStr}:`, response.data) // Add this line
        }
      }
    }

    connection.end()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const startYear = 2019 // Replace with the start year
const endYear = 2023 // Replace with the end year
fetchDataForYears(startYear, endYear)
  .then(() => {
    console.log('Data fetched successfully for the last five years')
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })
