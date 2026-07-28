const axios = require('axios')
const models = require('../models/index2')
const db = require('../config/databaseConnect')
const { handleInfo, handleError } = require('../config/log_creator')
const { targetStockIds } = require('./targetStockIds')

const run = async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateStockDayAll schedule' })
    const response = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL')
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
          return [parseInt(item.Code) || null, parseInt(item.TradeVolume) || null, parseInt(item.TradeValue) || null, parseFloat(item.OpeningPrice) || null, parseFloat(item.HighestPrice) || null, parseFloat(item.LowestPrice) || null, parseFloat(item.ClosingPrice) || null, parseFloat(item.Change) || null, parseInt(item.Transaction) || null, formattedDate]
        })
    console.log(result)
    if (result) await models.stockDayAllModels.insertData(result)
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateStockDayAll', 3)
    }
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await db.pool.end()
  }
}

run()
