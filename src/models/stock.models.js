const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 獲取特定股票詳細資訊
const getStockInfo = (stock_id) => {
  return new Promise((resolve, reject) => {
    // best one sql
    // SELECT * FROM stock s
    // JOIN stock_day_all sda ON s.stock_id = sda.stock_id
    // WHERE s.stock_id = 1101 AND sda.create_date = (
    //     SELECT MAX(create_date)
    //     FROM stock_day_all
    //     WHERE stock_id = 1101
    // );

    const sql = 'SELECT s.stock_id, s.name, sda.closing_price, sda.change, sda.trade_volume  FROM stock s JOIN stock_day_all sda ON s.stock_id=sda.stock_id WHERE s.stock_id=? ORDER BY create_date DESC LIMIT 1'
    db.query(sql, stock_id, (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getStockInfo', 4))
      } else if (result.length === 0) {
        reject(new AppError(new Error('Not seach data'), 'SqlError', 'getStockInfo', 3))
      } else {
        resolve(result[0])
      }
    })
  })
}

// 獲取特定股票週漲跌率
const getChangeOfWeek = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT closing_price FROM stock_day_all WHERE stock_id = ? ORDER BY create_date desc LIMIT 5'
    db.query(sql, [stock_id], (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getChangeOfWeek', 4))
      } else if (results.length === 0) {
        reject(new AppError(new Error('Not search data'), 'SqlError', 'getChangeOfWeek', 3))
      } else {
        resolve(results)
      }
    })
  })
}

// 抓取天氣與特定股票同日期資料
const selectWeatherWithStock = (type, stock_id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT ${['sunny', 'cloudy', 'rainny'].includes(type) ? 'w.status' : `'w.${type}`}, sda.closing_price, sda.date FROM weather w JOIN stock_day_all sda ON w.date = sda.date WHERE sda.stock_id = ?
    ${type === 'sunny' ? 'AND w.status < 7' : type === 'cloudy' ? 'AND w.status >= 7' : type === 'rainny' ? 'AND w.precipitation is not null' : ''} `
    db.query(sql, [stock_id], (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'selectWeatherWithStock', 4))
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { getStockInfo, getChangeOfWeek, selectWeatherWithStock }
