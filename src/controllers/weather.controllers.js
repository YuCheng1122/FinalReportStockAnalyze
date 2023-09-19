const { weatherAnaly } = require('../analysis/index')
const { weatherModels } = require('../models/index2')

const predictFmtqik = (type, timestamp) => {
  return new Promise(async (resolve, reject) => {
    try {
      let condition = type === 'sunny' ? 'w.status > 7' : type === 'cloudy' ? 'w.status >= 7' : 'w.precipitation > 0'
      let time = timestamp === 'one' ? '1' : timestamp === 'three' ? '3' : '7'
      let total = await weatherModels.selectWeatherCount(condition)
      let higher = await weatherModels.selectWeatherWithType(condition, time)
      let result = parseFloat((higher[0].count / total[0].count).toFixed(4))
      resolve({ predict_rate: result })
    } catch (error) {
      console.log(error.message)
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const weahterRegression = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      let condition = type === 'sunny' ? 'w.status > 7' : type === 'cloudy' ? 'w.status >= 7' : 'w.precipitation > 0'
      let total = await weatherModels.selectWeatherCount(condition)
      let higher = await weatherModels.selectWeatherWithType(condition)
      let result = parseFloat((higher[0].count / total[0].count).toFixed(4))
      resolve(result)
    } catch (error) {
      console.log(error.message)
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const weatherAutomicRegression = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      await weatherAnaly.atomicRegression(independent, dependent)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

const weatherCC = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await weatherAnaly.correlationCoefficient(independent, dependent)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { weahterRegression, weatherAutomicRegression, weatherCC, predictFmtqik }
