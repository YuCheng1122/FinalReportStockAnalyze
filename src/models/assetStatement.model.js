const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 爬蟲才會呼叫此function
const insertData = async (insertData) => {
  const sql = 'INSERT INTO assetStatements(stock_id,assets,currentAssets,longTermInvestment,shortTermInvestment,fixedAssets,cashAndCashEquivalents,accountsAndNotesReceivable,inventories,roa,roaT4Q,currentRatio,quickRatio,longTermLiabilitiesRatio,accountsAndNotesReceivableTurnoverRatio,inventoryTurnoverRatio,fixedAssetsTurnoverRatio,assetsTurnoverRatio,year,quarter)  VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增資產表成功')
    }
  })
}

const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT assets,currentAssets,longTermInvestment,shortTermInvestment,fixedAssets,cashAndCashEquivalents,accountsAndNotesReceivable,inventories,roa,roaT4Q,currentRatio,quickRatio,longTermLiabilitiesRatio,accountsAndNotesReceivableTurnoverRatio,inventoryTurnoverRatio,fixedAssetsTurnoverRatio,assetsTurnoverRatio,year,quarter FROM assetStatements  WHERE stock_id = ?'
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
