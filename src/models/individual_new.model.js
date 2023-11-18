const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = async (insertData) => {
  const sql = 'INSERT INTO individual_new(stock_id,title,time,link,imageSrc) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增各股新聞成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT title,time,link,imageSrc FROM individual_new WHERE stock_id = ?'
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
