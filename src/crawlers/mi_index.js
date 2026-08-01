const axios = require('axios')
const connection = require('../config/databaseConnect')
const API_URL = 'https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX'

async function fetchData() {
  try {
    const response = await axios.get(API_URL)
    const data = response.data

    if (data && Array.isArray(data)) {
      const results = data.map((item) => {
        return {
          index: item['指數'] || null,
          closing_index: parseFloat(item['收盤指數']) || null,
          rise_and_fall: item['漲跌'] || null,
          point_change: parseFloat(item['漲跌點數']) || null,
          percentage_change: parseFloat(item['漲跌百分比']) || null,
          special_handling_note: item['特殊處理註記'] || null,
          create_date: new Date(),
          update_date: new Date(),
        }
      })

      await Promise.all(
        results.map(
          (result) =>
            new Promise((resolve) => {
              const query = 'INSERT INTO mi_index SET ?'
              connection.query(query, result, (error) => {
                if (error) {
                  console.error('Error inserting data:', error)
                } else {
                  console.log('Inserted index:', result.index)
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
  .then((data) => {
    console.log('Data fetched successfully')
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })
