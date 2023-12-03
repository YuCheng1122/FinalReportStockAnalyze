const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = async (insertData) => {
  const sql = 'INSERT INTO dividend_policy(stock_id,announcedDate,cashDividend,stockDividend,XDTradingDate,XRTradingDate,cashDividendPaidDate,XDPriceRecoveryDays,payoutType) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增股利政策資料成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT announcedDate,cashDividend,stockDividend,XDTradingDate,XRTradingDate,cashDividendPaidDate,XDPriceRecoveryDays,payoutType FROM dividend_policy WHERE stock_id = ? order by announcedDate desc'
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

