const { Matrix, solve } = require('ml-matrix')
const { weatherModels, fmtqikModels } = require('../models/index2')
const { ControllerError } = require('../config/error_classes')

// 相關係數
const correlationCoefficient = async (type, stock_id) => {
    try {
      const datas = await weatherModels.selectWeatherWithStock(type, stock_id)
      // let datas = await weatherModels.selectWeatherWithFmtqik(type)
      let a = datas.map((item) => Number(item[type]))
      let b = datas.map((item) => Number(item.price))
      console.log(a, b)

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
      return { a, 'stock_price': b}
      
    } catch (error) {
      if (error.name === 'SqlError') {
        throw error
      } else {
        throw new ControllerError(error, 3)
      }
    }
  
}

// 回歸分析
const simpleLinearRegression = (type, stock_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 根據參數決定撈取什麼資料

      const weather_data = await weatherModels.selectWeatherWithStock(type, stock_id)
      const status_type = ['sunny', 'cloudy', 'rainny']
      if (status_type.includes(type)) type = 'status'

      const calculateAverage = (key1, key2) => {
        let sum = 0
        if (!key2) {
          for (let item of weather_data) sum += parseFloat(item[key1])
        } else if (typeof key2 === 'string') {
          for (let item of weather_data) {
            sum += parseFloat(item[key1]) * parseFloat(item[key2])
          }
        } else {
          for (let item of weather_data) {
            sum += Math.pow(parseFloat(item[key1]), 2)
          }
        }
        return sum / weather_data.length
      }
      const average_x = calculateAverage(type)
      const average_y = calculateAverage('price')
      const average_xy = calculateAverage('price', type)
      const average_x_square = calculateAverage(type, 2)
      const m = (average_xy - average_x * average_y) / (average_x_square - Math.pow(average_x, 2))
      const b = average_y - m * average_x

      const datas = weather_data.map((data) => {
        return { x: data[type], y: data.price }
      })

      resolve({ 'intercept:': parseFloat(b.toFixed(4)), 'slope: ': parseFloat(m.toFixed(4)), datas })
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
