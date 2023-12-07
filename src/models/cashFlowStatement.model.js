const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 爬蟲才會呼叫此function
const insertData = async (insertData) => {
  const sql = 'INSERT INTO cashflowstatement(stock_id,depreciation,amortization,operatingCashFlow,investingCashFlow,financingCashFlow,freeCashFlow,netCashFlow,capex,operatingCashFlowPerShare,investingCashFlowPerShare,financingCashFlowPerShare,freeCashFlowPerShare,netCashFlowPerShare,interestCoverageRatio,operatingCashFlowToCurrentLiabilitiesRatio,operatingCashFlowToLiabilitiesRatio,operatingCashFlowToNetIncomeRatio,year,quarter) VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增現金流量表成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT depreciation,amortization,operatingCashFlow,investingCashFlow,financingCashFlow,freeCashFlow,netCashFlow,capex,operatingCashFlowPerShare,investingCashFlowPerShare,financingCashFlowPerShare,freeCashFlowPerShare,netCashFlowPerShare,interestCoverageRatio,operatingCashFlowToCurrentLiabilitiesRatio,operatingCashFlowToLiabilitiesRatio,operatingCashFlowToNetIncomeRatio,year,quarter FROM cashflowstatement WHERE stock_id = ?'
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
