const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertInfo = (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO log(message, level, body) VALUES (?, ?, ?)'
    db.query(sql, insertValues, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        resolve()
      }
    })
  })
}

const insertError = (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO log(errorSource, errorLocation, errorStack, message, level) VALUES (?, ?, ?, ?,?)'
    db.query(sql, insertValues, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        resolve()
      }
    })
  })
}

const deleteData = () => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM log', (error) => {
      if (error) {
        reject(new AppError(error, 'ModelError', 'deleteData', 4))
      } else {
        resolve()
      }
    })
  })
}

module.exports = { insertInfo, insertError, deleteData }
