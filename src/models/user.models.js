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

const insertUser = async (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO user SET ?'
    db.query(sql, insertValues, (error, result) => {
      if (error) {
        console.log(error)
        reject({ message: `/src/user.models.js insertUser have some error, ${error.message}` })
        return
      }
      resolve()
    })
  })
}

const selectUser = async (email) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT user_id, password FROM user WHERE email = ?'
    db.query(sql, email, (error, result) => {
      if (error) {
        reject({ message: `/src/user.models.js selectUser have some error, ${error.message}` })
        return
      } else if (result.length === 0) {
        reject({ message: 'No search user email' })
        return
      }
      resolve(result[0])
    })
  })
}

const updatePassword = async (user_id, hashPassword) => {
  return new Promise((resolve, reject) => {
    
    let sql = 'UPDATE user SET PASSWORD = ? WHERE user_id = ?'
    db.query(sql, [hashPassword,user_id], (error, result) => {
      if (error) {
        reject({ message: `/src/user.models.js updatePassword have some error, ${error.message}` })
        return
      } else if (result.length === 0) {
        reject({ message: 'No search user email' })
        return
      }
      resolve(result[0])
    })
  })
}

module.exports = { insertUser, selectUser, updatePassword }
