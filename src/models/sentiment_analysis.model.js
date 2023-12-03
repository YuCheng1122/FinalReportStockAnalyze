const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT title,sentiment,score,description FROM sentiment_analysis WHERE stock_id = ?'
    db.query(sql,stock_id, (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getData', 4))
      } else {
        resolve(results)
      }
    })
  })
}


module.exports = { getData }
