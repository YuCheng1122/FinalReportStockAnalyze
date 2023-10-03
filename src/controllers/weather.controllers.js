const { weatherAnaly } = require('../analysis/index')
const { weatherModels } = require('../models/index2')
const {ControllerError} = require('../../error_classes')

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
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
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
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

const weatherAutomicRegression = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await weatherAnaly.atomicRegression(independent, dependent)
      resolve(result)
    } catch (error) {
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

const weatherCC = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await weatherAnaly.correlationCoefficient(independent, dependent)
      resolve(result)
    } catch (error) {
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

module.exports = { weahterRegression, weatherAutomicRegression, weatherCC, predictFmtqik }
