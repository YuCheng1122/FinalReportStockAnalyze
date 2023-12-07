const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

/**
 * 函数“insertData”是一个异步函数，它将数据插入到名为“assetstatements”的数据库表中。
 * @param insertData - `insertData` 参数是一个数组的数组。每个内部数组代表要插入到“assetstatements”表中的一行数据。每个内部数组中的值按照 SQL
 * 查询中指定的顺序对应于表中的列。
 */
const insertData = async (insertData) => {
  const sql = 'INSERT INTO assetstatements(stock_id,assets,currentAssets,longTermInvestment,shortTermInvestment,fixedAssets,cashAndCashEquivalents,accountsAndNotesReceivable,inventories,roa,roaT4Q,currentRatio,quickRatio,longTermLiabilitiesRatio,accountsAndNotesReceivableTurnoverRatio,inventoryTurnoverRatio,fixedAssetsTurnoverRatio,assetsTurnoverRatio,year,quarter)  VALUES ?'
  db.query(sql, [insertData], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('新增資產表成功')
    }
  })
}

/**
 * `getData` 函数从数据库中检索特定股票的财务数据。
 * @param stock_id - stock_id 参数用于指定要从 assetstatements 表中检索其数据的股票的 ID。
 * @returns `getData` 函数返回一个用 SQL 查询结果解析的 Promise。
 */
const getData = (stock_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT assets,currentAssets,longTermInvestment,shortTermInvestment,fixedAssets,cashAndCashEquivalents,accountsAndNotesReceivable,inventories,roa,roaT4Q,currentRatio,quickRatio,longTermLiabilitiesRatio,accountsAndNotesReceivableTurnoverRatio,inventoryTurnoverRatio,fixedAssetsTurnoverRatio,assetsTurnoverRatio,year,quarter FROM assetstatements  WHERE stock_id = ?'
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
