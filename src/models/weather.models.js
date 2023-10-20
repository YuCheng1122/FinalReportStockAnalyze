const db = require('../config/databaseConnect')
const { SqlError } = require('../config/error_classes')

const selectTemper = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT temperature, date FROM weather'
    db.query(sql, (error, results) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve(results)
      }
    })
  })
}

const selectWeatherWithFmtqik = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT w.STATUS, w.temperature,w.humidity,w.precipitation,f.price,f.date FROM weather w JOIN fmtqik f ON w.date=f.date'
    db.query(sql, (error, results) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve(results)
      }
    })
  })
}

const selectWeatherWithType = (condition, time) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS count FROM fmtqik AS a JOIN fmtqik AS b ON a.f_m_id = b.f_m_id + ${time} JOIN weather AS w ON a.date = w.date WHERE a.price > b.price AND ${condition}`
    db.query(sql, (error, results) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve(results)
      }
    })
  })
}

const selectWeatherCount = (condition) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) as count FROM weather w JOIN fmtqik f ON w.date = f.date WHERE ${condition}`
    db.query(sql, (error, results) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { selectTemper, selectWeatherWithFmtqik, selectWeatherWithType, selectWeatherCount }
