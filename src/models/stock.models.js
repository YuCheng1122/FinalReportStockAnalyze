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

    const sql = 'SELECT s.stock_id, s.name, CAST(sda.closing_price AS DOUBLE) as closing_price, CAST(sda.change AS DOUBLE) as `change`, sda.trade_volume  FROM stock s JOIN stock_day_all sda ON s.stock_id=sda.stock_id WHERE s.stock_id=? ORDER BY sda.date DESC LIMIT 1'
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

// 獲取特定股票詳細資訊
const getStockAllInfo = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT s.stock_id, s.name, sda.trade_volume, sda.trade_value,sda.`transaction`,CAST(sda.highest_price AS DOUBLE) as highest_price,CAST(sda.lowest_price AS DOUBLE) as lowest_price,CAST(sda.opening_price AS DOUBLE) as opening_price, CAST(sda.closing_price AS DOUBLE) as closing_price, CAST(sda.change AS DOUBLE) AS `change`, sda.date FROM stock s JOIN stock_day_all sda ON s.stock_id = sda.stock_id WHERE s.stock_id = ? ORDER BY sda.date DESC'
    db.query(sql,stock_id, (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getStockInfo', 4))
      } else if (result.length === 0) {
        reject(new AppError(new Error('Not seach data'), 'SqlError', 'getStockInfo', 3))
      } else {
        resolve(result)
      }
    })
  })
}

// 獲取特定pe, pb
const getStockPePb = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT a.stock_id, CAST(a.p_e_ratio AS DOUBLE) as p_e_ratio , CAST(a.p_b_ratio AS DOUBLE) as p_b_ratio, a.date FROM bwibbu_all a INNER JOIN (SELECT stock_id, MAX(date) AS max_date FROM bwibbu_all GROUP BY stock_id) b ON a.stock_id = b.stock_id AND a.date = b.max_date WHERE a.stock_id = ?;'
    db.query(sql, [stock_id], (error, result) => {
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
    let sql = `SELECT ${['sunny', 'cloudy'].includes(type) ? 'w.status' : type === 'rainny' ? 'w.precipitation' : `w.${type}`}, sda.closing_price, sda.date FROM weather w JOIN stock_day_all sda ON DATE(w.date) = DATE(sda.date) WHERE sda.stock_id = ?
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

// 更新股票基本資訊(爬蟲用)
const updateStockFinanceInfo = async (insertValues) => {
  const sql = 'UPDATE stock SET description = ?, ceo = ?, established_time = ?, headquater = ?, website = ?, staff_number = ?, market_value = ?, dividend_rate = ? WHERE stock_id = ?'
  db.query(sql, insertValues, (error, result) => {
    if (error) {
      console.log(error)
    }
  })
}

const getStockDescription = (stock_id) => {
  return new Promise((resolve,reject) => {
    const sql = 'SELECT description, ceo, established_time, headquater, website ,staff_number, market_value, dividend_rate FROM stock WHERE stock_id = ?'
    db.query(sql,stock_id,(error,result) => {
      if(error){
        reject(new AppError(error, 'Model', 'getStockDescription', 4))
      }else{
        resolve(result)
      }
    })
  })
}

module.exports = { getStockInfo, getStockAllInfo, getStockPePb, getChangeOfWeek, selectWeatherWithStock, updateStockFinanceInfo, getStockDescription }
