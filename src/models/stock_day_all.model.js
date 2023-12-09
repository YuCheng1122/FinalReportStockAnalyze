const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = (insertValues) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO stock_day_all(stock_id, trade_volume, trade_value, opening_price, highest_price, lowest_price, closing_price, `change`, transaction, `date`) VALUES ?'
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

module.exports = { insertData }
