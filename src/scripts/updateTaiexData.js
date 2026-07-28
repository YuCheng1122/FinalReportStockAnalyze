const axios = require('axios')
const models = require('../models/index2')
const db = require('../config/databaseConnect')
const { handleInfo, handleError } = require('../config/log_creator')

const run = async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateTaiexData schedule' })
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}${month}${day}`
    const response = await axios.get(`https://www.twse.com.tw/rwd/en/TAIEX/MI_5MINS_HIST?date=${formattedDate}&response=json&_=170039420045`)
    if (response.data.stat === 'OK') {
      const data = response.data.data
      const [date, openingIndex, highestIndex, lowestIndex, closingIndex] = data[data.length - 1]
      const result = [date, parseFloat(openingIndex.replace(/,/g, '')), parseFloat(highestIndex.replace(/,/g, '')), parseFloat(lowestIndex.replace(/,/g, '')), parseFloat(closingIndex.replace(/,/g, '')), new Date(), new Date()]
      if (result) await models.taiexModels.insertData(result)
    }
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateTaiexData', 3)
    }
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await db.pool.end()
  }
}

run()
