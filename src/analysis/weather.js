const { Matrix, solve } = require('ml-matrix')
const { weatherModels, fmtqikModels } = require('../models/index2')
const { ControllerError } = require('../../error_classes')

// 相關係數
const correlationCoefficient = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mapping = {
        fmtqik: weatherModels.selectWeatherWithFmtqik,
      }
      let datas = await mapping[dependent]()
      let a = datas.map((item) => Number(item[independent]))
      let b = datas.map((item) => Number(item.price))

      const minlength = Math.min(a.length, b.length)
      let aa = a.reduce((acc, val) => acc + val) / minlength
      let ab = b.reduce((acc, val) => acc + val) / minlength

      let vara = a.reduce((acc, val) => acc + Math.pow(val - aa, 2), 0) / (minlength - 1)
      let varb = b.reduce((acc, val) => acc + Math.pow(val - ab, 2), 0) / (minlength - 1)
      let cov = a.reduce((acc, val, i) => acc + (val - aa) * (b[i] - ab), 0) / (minlength - 1)

      vara = vara.toFixed(4)
      varb = varb.toFixed(4)
      cov.toFixed(4)
      let result = cov / (Math.sqrt(vara) * Math.sqrt(varb))
      result = result.toFixed(4)
      resolve({ cc: result })
    } catch (error) {
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

// 回歸分析
const simpleLinearRegression = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 根據參數決定撈取什麼資料
      const mapping = {
        fmtqik: weatherModels.selectWeatherWithFmtqik,
      }

      const weather_fmtqik_data = await mapping[dependent]()
      const calculateAverage = (key1, key2) => {
        let sum = 0
        if (!key2) {
          for (let item of weather_fmtqik_data) sum += parseFloat(item[key1])
        } else if (typeof key2 === 'string') {
          for (let item of weather_fmtqik_data) {
            sum += parseFloat(item[key1]) * parseFloat(item[key2])
          }
        } else {
          for (let item of weather_fmtqik_data) {
            sum += Math.pow(parseFloat(item[key1]), 2)
          }
        }
        return sum / weather_fmtqik_data.length
      }

      let average_x = calculateAverage(independent)
      let average_y = calculateAverage('price')
      let average_xy = calculateAverage('price', independent)
      let average_x_square = calculateAverage(independent, 2)
      console.log(average_x, average_y, average_xy, average_x_square)
      let m = (average_xy - average_x * average_y) / (average_x_square - Math.pow(average_x, 2))
      let b = average_y - m * average_x
      resolve({ '截距:': b, '斜率: ': m })
    } catch (error) {
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

// 核回歸分析
const atomicRegression = (independent, dependent) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mapping = {
        fmtqik: weatherModels.selectWeatherWithFmtqik,
      }
      const weather_fmtqik_data = await mapping[dependent]()

      let knernal_array = []
      let y_array = []
      for (let i = 0; i < weather_fmtqik_data.length; i += 1) {
        let row = []
        for (let item of weather_fmtqik_data) {
          let temp = -(Math.pow(parseFloat(weather_fmtqik_data[i][independent]) - parseFloat(item[independent]), 2) / 2)
          row.push(parseFloat(Math.exp(temp)))
        }
        knernal_array.push(row)
        y_array.push(parseFloat(weather_fmtqik_data[i].price))
      }

      let k = new Matrix(knernal_array)
      let y = Matrix.columnVector(y_array)
      console.log(k.diag())
      // Singular Value Decomposition
      let w = solve(k, y, (useSVD = true))

      // 求出w後，再呼叫預測的independent的值去做dependent的預測
      // 公式: y = sum_{i=1}^權重陣列長度 wik(x_i, x)
      console.log(y)
      resolve()
    } catch (error) {
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

module.exports = { simpleLinearRegression, atomicRegression, correlationCoefficient }
