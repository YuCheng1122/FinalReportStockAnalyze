// const db = require('../config/databaseConnect')
// const { SqlError } = require('../config/error_classes')

// const selectTemper = () => {
//   return new Promise((resolve, reject) => {
//     let sql = 'SELECT temperature, date FROM weather'
//     db.query(sql, (error, results) => {
//       if (error) {
//         reject(new SqlError(error, 4))
//       } else {
//         resolve(results)
//       }
//     })
//   })
// }

// const selectWeatherWithFmtqik = (type) => {
//   return new Promise((resolve, reject) => {
//     let sql = `SELECT ${['sunny', 'cloudy', 'rainny'].includes(type) ? 'w.status' : `'w.${type}`} ,f.price,f.date FROM weather w JOIN fmtqik f ON w.date=f.date ${type === 'sunny' ? 'WHERE w.status < 7.0 ' : type === 'cloudy' ? 'WHERE w.status >= 7.0' : type === 'rainny' ? 'WHERE w.precipitation is not null' : ''}`
//     db.query(sql, (error, results) => {
//       if (error) {
//         reject(new SqlError(error, 4))
//       } else {
//         resolve(results)
//       }
//     })
//   })
// }

// const selectWeatherWithType = (condition, time) => {
//   return new Promise((resolve, reject) => {
//     let sql = `SELECT COUNT(*) AS count FROM fmtqik AS a JOIN fmtqik AS b ON a.f_m_id = b.f_m_id + ${time} JOIN weather AS w ON a.date = w.date WHERE a.price > b.price AND ${condition}`
//     db.query(sql, (error, results) => {
//       if (error) {
//         reject(new SqlError(error, 4))
//       } else {
//         resolve(results)
//       }
//     })
//   })
// }

// const selectWeatherCount = (condition) => {
//   return new Promise((resolve, reject) => {
//     let sql = `SELECT COUNT(*) as count FROM weather w JOIN fmtqik f ON w.date = f.date WHERE ${condition}`
//     db.query(sql, (error, results) => {
//       if (error) {
//         reject(new SqlError(error, 4))
//       } else {
//         resolve(results)
//       }
//     })
//   })
// }

// // 依照天氣型態獲取以天氣日期與股票日期相對應的聯表資料
// // 目前沒有stock_day_all 的 date 所以沒辦法使用
// const selectWeatherWithStock = (type, stock_id) => {
//   return new Promise((resolve, reject) => {
//     let sql = `SELECT${['sunny', 'cloudy', 'rainny'].includes(type) ? 'w.status' : `'w.${type}`}, sda.closing_price, sda.date FROM weather w JOIN stock_day_all sda ON w.date = sda.date WHERE sda.stock_id = ?
//     ${type === 'sunny' ? 'AND w.status < 7' : type === 'cloudy' ? 'AND w.status >= 7' : type === 'rainny' ? 'AND w.precipitation is not null' : ''} `
//     db.query(sql, [stock_id], (error, results) => {
//       if (error) {
//         reject(new SqlError(error, 4))
//       } else {
//         resolve(results)
//       }
//     })
//   })
// }


// module.exports = { selectTemper, selectWeatherWithFmtqik, selectWeatherWithType, selectWeatherCount, selectWeatherWithStock }
