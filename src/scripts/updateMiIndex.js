const axios = require('axios')
const models = require('../models/index2')
const db = require('../config/databaseConnect')
const { handleInfo, handleError } = require('../config/log_creator')

const run = async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateMiIndex schedule' })
    const response = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX')
    const data = response.data
    const result =
      data &&
      Array.isArray(data) &&
      data.map((item) => {
        return [item['指數'], parseFloat(item['收盤指數']), item['漲跌'], parseFloat(item['漲跌點數']) || null, parseFloat(item['漲跌百分比']) || null, item['特殊處理註記'], new Date(), new Date()]
      })
    if (result) await models.miIndexModels.insertData(result)
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateMiIndex', 3)
    }
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await db.pool.end()
  }
}

run()
