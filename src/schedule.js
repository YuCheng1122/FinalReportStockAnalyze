const schedule = require('node-schedule')
const { handleInfo, handleError } = require('./config/log_creator')

// BWIBBU(每日本意比)
const updateBwibbu = schedule.scheduleJob('* * 1 * *', () => {
  handleInfo({
    tag: 'schedule',
    message: 'Started updateBwibbu schedule',
  })
})

// stock_day_all(每日股價資訊])
const updateStockDayAll = schedule.scheduleJob('* * 1 * *', () => {
  handleInfo({
    tag: 'schedule',
    message: 'Started updateStockDayAll schedule',
  })
})

// news (每日新聞)
const updateNews = schedule.scheduleJob('* * 1 * *', () => {
  handleInfo({
    tag: 'schedule',
    message: 'Started updateNews schedule',
  })
})

// individual_news (每日個股新聞)
const updateIndividualNews = schedule.scheduleJob('* * 1 * *', () => {
  handleInfo({
    tag: 'schedule',
    message: 'Started updateIndividualNews schedule',
  })
})

// mi_index (每日產業指數)
const updateMiIndex = schedule.scheduleJob('* * 1 * *', () => {
  handleInfo({
    tag: 'schedule',
    message: 'Started updateMiIndex schedule',
  })
})

const updateTaiexData = schedule.scheduleJob('* * 1 * *', () => {
  handleInfo({
    tag: 'schedule',
    message: 'Started updateTaiexData schedule',
  })
})

const updateWeather = schedule.scheduleJob('* * 1 * *', () => {
  handleInfo({
    tag: 'schedule',
    message: 'Started updateWeather schedule',
  })
})

module.exports = { updateBwibbu, updateStockDayAll, updateNews, updateIndividualNews, updateMiIndex, updateTaiexData, updateWeather }
