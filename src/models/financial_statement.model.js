const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 爬蟲才會呼叫此function
const insertData = async (insertData) => {
  const sql = 'INSERT INTO financial_statement(stock_id, year, season, link) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增電子財報成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT year, season, link FROM financial_statement WHERE stock_id = ?'
    db.query(sql, stock_id, (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'getData', 4))
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { insertData, getData }
