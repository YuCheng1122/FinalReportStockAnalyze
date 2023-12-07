const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 爬蟲才會呼叫此function
const insertData = async (insertData) => {
  const sql = 'INSERT INTO incomestatements(stock_id,revenue,grossProfit,operatingExpenses,sellingExpenses,administrativeExpenses,researchAndDevelopmentExpenses,operatingIncome,profitBeforeTax,netIncome,netIncomeAttributableToOwnersOfTheParent,eps,epsQOQ,epsYOY,epsT4Q,epsT4QAvg,epsT4QQOQ,epsT4QYOY,grossMargin,operatingMargin,profitBeforeTaxMargin,netIncomeMargin,incomeTaxToProfitBeforeTaxRatio,operatingExpenseRatio,researchAndDevelopmentExpensesToSalesRatio,nonOperatingIncomeToProfitBeforeTax,sellingExpensesToSalesRatio,administrativeExpensesToSalesRatio,year,quarter) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增損益表成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT revenue,grossProfit,operatingExpenses,sellingExpenses,administrativeExpenses,researchAndDevelopmentExpenses,operatingIncome,profitBeforeTax,netIncome,netIncomeAttributableToOwnersOfTheParent,eps,epsQOQ,epsYOY,epsT4Q,epsT4QAvg,epsT4QQOQ,epsT4QYOY,grossMargin,operatingMargin,profitBeforeTaxMargin,netIncomeMargin,incomeTaxToProfitBeforeTaxRatio,operatingExpenseRatio,researchAndDevelopmentExpensesToSalesRatio,nonOperatingIncomeToProfitBeforeTax,sellingExpensesToSalesRatio,administrativeExpensesToSalesRatio,year,quarter FROM incomestatements WHERE stock_id = ?'
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
