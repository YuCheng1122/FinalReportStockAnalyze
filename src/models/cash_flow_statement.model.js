const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = async (insertData) => {
  const sql = 'INSERT INTO cash_flow_statement(stock_id,date,net_income,net_income_ycp,operating_cash,operating_cash_ycp,investment_cash,investment_cash_ycp,financing_cash,financing_cash_ycp,net_change_in_cash,net_change_in_cash_ycp,free_cash_flow,free_cash_flow_ycp) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增現金流量資料成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT date,net_income,net_income_ycp,operating_cash,operating_cash_ycp,investment_cash,investment_cash_ycp,financing_cash,financing_cash_ycp,net_change_in_cash,net_change_in_cash_ycp,free_cash_flow,free_cash_flow_ycp FROM cash_flow_statement WHERE stock_id = ?'
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
// * cash_flow_statement_id
// * stock_id
// * date
// * net_income, 淨利
// * net_income_ycp
// * operating_cash, 營運現金
// * operating_cash_ycp
// * investment_cash, 投資現金,
// *  investment_cash_ycp
// * financing_cash, 融資現金
// * financing_cash_ycp ,
// * net_change_in_cash, 現金變動淨額
// * net_change_in_cash_ycp
// * free_cash_flow, 自由現金流
// * free_cash_flow_ycp
