const axios = require('axios')
const connection = require('../config/databaseConnect')
const API_URL = 'https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL'

async function getStockIds() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT stock_id FROM stock', (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.map((row) => row.stock_id))
      }
    })
  })
}

async function fetchData(stockIds) {
  try {
    const response = await axios.get(API_URL)
    const data = response.data

    if (data && Array.isArray(data)) {
      const results = data
        .filter((item) => stockIds.includes(parseInt(item.Code)))
        .map((item) => {
          return {
            stock_id: parseInt(item.Code),
            name: item.Name,
            p_e_ratio: parseFloat(item.PEratio) || null, // Use null if NaN
            dividend_yield: parseFloat(item.DividendYield) || null, // Use null if NaN
            p_b_ratio: parseFloat(item.PBratio) || null, // Use null if NaN
            create_date: new Date(),
            update_date: new Date(),
          }
        })

      results.forEach((result) => {
        const query = 'INSERT INTO BWIBBU_ALL SET ?'
        connection.query(query, result, (error) => {
          if (error) {
            console.error('Error inserting data:', error)
            return
          }
          console.log('Inserted stock_id:', result.stock_id)
        })
      })

      connection.pool.end()
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

getStockIds()
  .then((stockIds) => {
    fetchData(stockIds)
  })
  .catch((error) => {
    console.error('Error fetching stock ids:', error)
  })
