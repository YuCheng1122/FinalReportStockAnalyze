const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 爬蟲才會呼叫此function
const insertData = async (insertData) => {
  const sql = 'INSERT INTO balanceSheetLiabilitiesEquity(stock_id,liabilities,currentLiabilities,longTermLiabilities,accountsAndNotesPayable,advanceReceipts,shortTermBorrowings,shortTermNotesAndBillsPayable,longTermLiabilitiesCurrentPortion,equity,commonStocks,retainedEarnings,nav,roe,roeT4Q,reinvestmentRate,debtRatio,accountsAndNotesPayableTurnoverDays,year,quarter)  VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增負債與股東權益表成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT liabilities,currentLiabilities,longTermLiabilities,accountsAndNotesPayable,advanceReceipts,shortTermBorrowings,shortTermNotesAndBillsPayable,longTermLiabilitiesCurrentPortion,equity,commonStocks,retainedEarnings,nav,roe,roeT4Q,reinvestmentRate,debtRatio,accountsAndNotesPayableTurnoverDays,year,quarter FROM balanceSheetLiabilitiesEquity WHERE stock_id = ?'
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
