const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = async (insertData) => {
  return new Promise((resolve,reject) => {
    const sql = 'INSERT INTO card SET ?'
    db.query(sql, insertData, (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'insertData', 4))
      } else {
        resolve()
      }
    })
  })
}

const getData = (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT card_id, image_link, type , create_date FROM card WHERE user_id = ?'
    db.query(sql, user_id, (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'getData', 4))
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { insertData, getData }
