const mysql = require('mysql2')

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

const selectTemper = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT temperature, date FROM weather'
    db.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        reject({ message: `/src/weather.models.js selectTemper have some error, ${error.message}` })
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
        console.log(error)
        reject({ message: `/src/weather.models.js selectWeatherWithFmtqik have some error, ${error.message}` })
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
        console.log(error)
        reject({ message: `/src/weather.models.js selectWeatherWithType have some error, ${error.message}` })
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
        console.log(error)
        reject({ message: `/src/weather.models.js selectWeatherCount have some error, ${error.message}` })
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { selectTemper, selectWeatherWithFmtqik, selectWeatherWithType, selectWeatherCount }
