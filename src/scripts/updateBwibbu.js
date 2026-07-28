const axios = require('axios')
const models = require('../models/index2')
const db = require('../config/databaseConnect')
const { handleInfo, handleError } = require('../config/log_creator')
const { targetStockIds } = require('./targetStockIds')

const run = async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateBwibbu schedule' })
    const response = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL')
    const today = new Date()
    const formattedDate = today
      .toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/-/g, '/')
    const data = response.data
    const result =
      data &&
      Array.isArray(data) &&
      data
        .filter((item) => targetStockIds.includes(item.Code))
        .map((item) => {
          return [parseInt(item.Code), item.Name, parseFloat(item.PEratio) || null, parseFloat(item.DividendYield) || null, parseFloat(item.PBratio) || null, formattedDate]
        })
    console.log(result)
    if (result) await models.bwibbuAllModels.insertData(result)
    console.log('完成')
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateBwibbu', 3)
    }
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 500)) // let async log writes flush
    await db.pool.end()
  }
}

run()
