const mysql = require('mysql2')
require('dotenv').config()

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

const deleteUser = () => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM user', (error, result) => {
      if (error) {
        reject('DeleteUser have some problems.')
      } else {
        resolve()
      }
    })
  })
}

const deletePreferStock = () => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM preferstock', (error, result) => {
      if (error) {
        console.log(error)
        reject('DeletePreferStock have some problems.')
      } else {
        resolve()
      }
    })
  })
}

const deleteHistory = () => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM history', (error, result) => {
      if (error) {
        reject('DeleteHistory have some problems.')
      } else {
        resolve()
      }
    })
  })
}

const deleteComment = () => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM comment', (error, result) => {
      if (error) {
        reject('DeleteComment have some problems.')
      } else {
        resolve()
      }
    })
  })
}

module.exports = async () => {
  await deletePreferStock()
  await deleteHistory()
  await deleteUser()
  await deleteComment()
}
