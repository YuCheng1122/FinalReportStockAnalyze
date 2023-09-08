const { weatherAnaly } = require('../analysis/index')

const weahterRegression = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await weatherAnaly.simpleLinearRegression(independent, dependent)
      resolve(result)
    } catch (error) {
      reject(error)
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

module.exports = { weahterRegression, weatherAutomicRegression }
