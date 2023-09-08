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

const selectAll = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM weather'
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

module.exports = { selectAll }
