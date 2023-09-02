const mysql = require('mysql')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

const dbConfig = {
  host: 'localhost',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
}

const connection = mysql.createConnection({
  ...dbConfig,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
})

const saveToDatabase = (stockId, weaklyAvg, avg20, avg60, ema, macd, rsi, k, d, date) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO technical_analysis (stock_id, date, weaklyAvg, avg20, avg60, ema, macd, rsi, k, d) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    connection.query(query, [stockId, date, weaklyAvg, avg20, avg60, ema, macd, rsi, k, d], (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

const calculateMovingAverage = (data, days) => {
  const result = []
  for (let i = 0; i < data.length; i++) {
    const slice = data.slice(Math.max(0, i - days + 1), i + 1)
    const sum = slice.reduce((acc, val) => acc + val, 0)
    result.push(sum / slice.length)
  }
  return result
}

const calculateExponentialMovingAverage = (data, days) => {
  const alpha = 2 / (days + 1)
  let ema = []
  ema[0] = data[0]
  for (let i = 1; i < data.length; i++) {
    ema[i] = alpha * data[i] + (1 - alpha) * ema[i - 1]
  }
  return ema
}

const calculateMACD = (data) => {
  if (data.length < 26) return Array(data.length).fill(null)
  const ema12 = calculateExponentialMovingAverage(data, 12)
  const ema26 = calculateExponentialMovingAverage(data, 26)
  const macd = []
  for (let i = 0; i < data.length; i++) {
    macd[i] = (ema12[i] || 0) - (ema26[i] || 0)
  }
  return macd
}

const calculateRSI = (data) => {
  if (data.length < 15) return Array(data.length).fill(null)
  let gain = 0,
    loss = 0
  const rsi = Array(data.length).fill(0)

  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1]
    if (diff >= 0) gain += diff
    else loss += Math.abs(diff)
  }
  let avgGain = gain / 14
  let avgLoss = loss / 14
  const rs = avgGain / avgLoss
  rsi[14] = 100 - 100 / (1 + rs)
  for (let i = 15; i < data.length; i++) {
    const diff = data[i] - data[i - 1]
    if (diff >= 0) gain = diff
    else loss = Math.abs(diff)
    avgGain = (avgGain * 13 + gain) / 14
    avgLoss = (avgLoss * 13 + loss) / 14
    const rs = avgGain / avgLoss
    rsi[i] = 100 - 100 / (1 + rs)
  }
  return rsi
}

const calculateKD = (data) => {
  let k = 50,
    d = 50
  const kd = []
  for (let i = 8; i < data.length; i++) {
    const high = Math.max(...data.slice(i - 8, i + 1))
    const low = Math.min(...data.slice(i - 8, i + 1))
    const rsv = ((data[i] - low) / (high - low)) * 100
    k = (2 / 3) * k + (1 / 3) * rsv
    d = (2 / 3) * d + (1 / 3) * k
    kd.push({ k, d })
  }
  return kd
}

const doQueries = async () => {
  try {
    const stockIds = ['1101']
    for (const stockId of stockIds) {
      const query = `SELECT date, closing_price FROM stock_day_all WHERE stock_id = ${stockId} ORDER BY date ASC`
      connection.query(query, async (err, results) => {
        if (err) throw err
        const dates = results.map((row) => row.date.toISOString().split('T')[0])
        const closingPrices = results.map((row) => parseFloat(row.closing_price))
        const weaklyAvg = calculateMovingAverage(closingPrices, 5)
        const avg20 = calculateMovingAverage(closingPrices, 20)
        const avg60 = calculateMovingAverage(closingPrices, 60)
        const ema = calculateExponentialMovingAverage(closingPrices, 12)
        const macd = calculateMACD(closingPrices)
        const rsi = calculateRSI(closingPrices)
        const kd = calculateKD(closingPrices)

        const promises = []
        for (let i = 0; i < dates.length; i++) {
          const kdVal = kd[i] || { k: null, d: null }
          promises.push(saveToDatabase(stockId, weaklyAvg[i] || null, avg20[i] || null, avg60[i] || null, ema[i] || null, macd[i] || null, rsi[i] || null, kdVal.k, kdVal.d, dates[i]))
        }
        await Promise.all(promises)
        connection.end()
      })
    }
  } catch (err) {
    console.error(err)
    connection.end()
  }
}

connection.connect((err) => {
  if (err) throw err
  console.log('Connected to the database.')
  doQueries()
})
