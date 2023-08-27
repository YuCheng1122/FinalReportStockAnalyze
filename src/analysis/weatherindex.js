const mysql = require('mysql')
const axios = require('axios')
const path = require('path')
const Chart = require('chart.js')
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
// Connect to the database
connection.connect((err) => {
  if (err) throw err
  console.log('Connected to the database.')

  // Fetch data from fmtqik table
  connection.query('SELECT * FROM fmtqik', (err, results) => {
    if (err) throw err
    console.log('Data from fmtqik table:', results)
  })

  // Fetch data from wather table
  connection.query('SELECT * FROM weather', (err, results) => {
    if (err) throw err
    console.log('Data from weather table:', results)
  })

  // Calculate average trade_volume in FMTQIK table
  connection.query('SELECT AVG(trade_volume) AS avgTradeVolume FROM FMTQIK', (err, results) => {
    if (err) throw err
    console.log('Average Trade Volume:', results[0].avgTradeVolume)
  })

  // Calculate average temperature in weather table
  connection.query('SELECT AVG(temperature) AS avgTemperature FROM weather', (err, results) => {
    if (err) throw err
    console.log('Average Temperature:', results[0].avgTemperature)
  })
  // Fetch trade_volume data from FMTQIK table
  connection.query('SELECT trade_volume FROM FMTQIK', (err, results) => {
    if (err) throw err
    const tradeVolumes = results.map((row) => row.trade_volume)

    // Create bar chart for trade volume
    const ctx1 = document.getElementById('tradeVolumeChart').getContext('2d')
    const tradeVolumeChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Trade Volume'],
        datasets: [
          {
            label: 'Trade Volume in FMTQIK',
            data: tradeVolumes,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    })
  })

  // Fetch temperature data from weather table
  connection.query('SELECT temperature FROM weather', (err, results) => {
    if (err) throw err
    const temperatures = results.map((row) => row.temperature)

    // Create line chart for temperature
    const ctx2 = document.getElementById('temperatureChart').getContext('2d')
    const temperatureChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Temperature'],
        datasets: [
          {
            label: 'Temperature in Weather',
            data: temperatures,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
          },
        ],
      },
    })
  })
  // Close the connection
  connection.end()
})
