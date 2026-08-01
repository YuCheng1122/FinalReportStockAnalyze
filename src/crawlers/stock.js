const axios = require('axios')
const connection = require('../config/databaseConnect')
const API_URL = 'https://openapi.twse.com.tw/v1/opendata/t187ap03_L'

async function fetchData() {
  try {
    const response = await axios.get(API_URL)
    const data = response.data

    if (data && Array.isArray(data)) {
      const results = data.map((item) => {
        return {
          stock_id: item['公司代號'],
          name: item['公司簡稱'],
          industry: item['產業別'],
        }
      })

      await Promise.all(
        results.map(
          (result) =>
            new Promise((resolve) => {
              const query = 'INSERT INTO stock SET ?'
              connection.query(query, result, (error) => {
                if (error) {
                  console.error('Error inserting data:', error)
                } else {
                  console.log('Inserted stock_id:', result.stock_id)
                }
                resolve()
              })
            })
        )
      )

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
