const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 爬蟲才會呼叫此function
const insertData = async (insertData) => {
  const sql = 'INSERT INTO balance_sheet(stock_id,date,cash_and_short_term_investment,cash_and_short_term_investment_ycp,total_assets,total_assets_ycp,total_debts,total_debts_ycp,total_equitys,total_equitys_ycp,tradable_shares,tradable_shares_ycp,pb_ratio,pb_ratio_ycp,roa,roa_ycp,roc,roc_ycp) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增資產負債表成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT date,cash_and_short_term_investment,cash_and_short_term_investment_ycp,total_assets,total_assets_ycp,total_debts,total_debts_ycp,total_equitys,total_equitys_ycp,tradable_shares,tradable_shares_ycp,pb_ratio,pb_ratio_ycp,roa,roa_ycp,roc,roc_ycp FROM balance_sheet WHERE stock_id = ?'
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

// * balance_sheet_id
// * stock_id
// * date
// * cash_and_short_term_investment , 現金與短期投資
// * cash_and_short_term_investment_ycp
// * total_assets,  總資產
// * total_assets_ycp
// * total_debts, 總負債
// * total_debts_ycp ,
// * total_equitys, 總權益
// * total_equitys_ycp
// * tradable_shares, 流通股份
// * tradable_shares_ycp
// * pb_ratio, 股價淨值比
// * pb_ratio_ycp
// * roa, 資產報酬率
// * roa_ycp
// * roc, 資本報酬率
// * roc_ycp
