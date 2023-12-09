const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const getTaiexDataByDate = (date) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM taiex_data WHERE date = ?'
    db.query(sql, [date], (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getTaiexDataByDate', 4))
      } else if (results.length === 0) {
        reject(new AppError(new Error('No data found'), 'SqlError', 'getTaiexDataByDate', 3))
      } else {
        resolve(results[0])
      }
    })
  })
}

const getAllTaiexData = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM taiex_data ORDER BY date DESC'
    db.query(sql, (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getAllTaiexData', 4))
      } else if (results.length === 0) {
        reject(new AppError(new Error('No data found'), 'SqlError', 'getAllTaiexData', 3))
      } else {
        resolve(results)
      }
    })
  })
}

const insertData = (insertValues) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO taiex_data(`date`, opening_index, highest_index, lowest_index, closing_index, create_date, update_date) VALUES (?)'
    db.query(sql, [insertValues], (error, result) => {
      if (error) {
        console.log(error)
        reject(new AppError(error, 'ModelError', 'insertData', 4))
      } else {
        resolve()
      }
    })
  })
}

module.exports = { getTaiexDataByDate, getAllTaiexData, insertData }
