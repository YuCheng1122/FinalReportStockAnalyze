const axios = require('axios')
const connection = require('../config/databaseConnect')
const API_URL = 'https://openapi.twse.com.tw/v1/opendata/t187ap14_L'

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

fetchData()
