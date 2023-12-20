const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertLight = (insertValues) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO light SET ?'
    db.query(sql, insertValues, (error, result) => {
      if (error) {
        reject(new AppError(error, 'ModelError', 'insertLight', 4))
      } else {
        resolve()
      }
    })
  })
}

const getAllLight = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT l.user_id, l.name, l.message, l.stock_id, s.name AS company_name , l.create_date FROM light l JOIN stock s ON l.stock_id = s.stock_id'
    db.query(sql, (error, result) => {
      if (error) {
        reject(new AppError(error, 'ModelError', 'getAllLight', 4))
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { insertLight, getAllLight }
