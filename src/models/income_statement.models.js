const db = require('../config/databaseConnect')
const AppError = require('../config/error_classes')

const insertData = async (insertData) => {
  const sql = 'INSERT INTO income_statement(stock_id,date,income,income_ycp,operating_expenses,operating_expenses_ycp,net_income,net_income_ycp,net_income_rate,net_income_rate_ycp,eps,eps_ycp,operating_capital_flow,operating_capital_flow_ycp,valid_tax_rate,valid_tax_rate_ycp) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增損益表成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve,reject) => {
    const sql = 'SELECT date,income,income_ycp,operating_expenses,operating_expenses_ycp,net_income,net_income_ycp,net_income_rate,net_income_rate_ycp,eps,eps_ycp,operating_capital_flow,operating_capital_flow_ycp,valid_tax_rate,valid_tax_rate_ycp FROM income_statement WHERE stock_id = ?'
    db.query(sql,stock_id,(error,result) => {
      if(error){
        reject(new AppError(error, 'Model', 'getData', 4))
      }else{
        resolve(result)
      }
    })
  })
}

module.exports = { insertData, getData }
// * stock_id
// * date
// * income, income_ycp 收益
// * operating_expenses, operating_expenses_ycp 營業費用
// * net_income, net_income_ycp 淨利
// * net_income_rate, net_income_ycp 淨利潤率
// * eps, eps_ycp 每股盈餘
// * operating_capital_flow, operating_capital_flow_ycp 營業資金流動
// * valid_tax_rate, valid_tax_rate_ycp 有效稅率
