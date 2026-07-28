const connection = require("../config/databaseConnect");
const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

async function insertStockData(stockData) {
  fetchAllStockData().then((stockDataArray) => {
    if (!Array.isArray(stockDataArray)) {
      console.error("The data fetched is not an array:", stockDataArray);
      return;
    }
    insertStockData(stockDataArray).catch(console.error);
  });

  const sql = `
        INSERT INTO Stock (code, trade_value, opening_price, highest_price, lowest_price, closing_price, price_change, trade_volume, transaction, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  let processedCount = 0; // 初始化已處理的股票數量

  for (let data of stockData) {
    try {
      await queryAsync(sql, [
        data.Code,
        data.TradeValue,
        data.OpeningPrice,
        data.HighestPrice,
        data.LowestPrice,
        data.ClosingPrice,
        data.Change,
        data.TradeVolume,
        data.Transaction,
        new Date(),
      ]);

      processedCount++; // 增加已處理的股票數量
      console.log(
        `Processed stock code: ${data.Code}. Total processed: ${processedCount}/${stockData.length}`
      );
    } catch (error) {
      console.error(`Error inserting data for stock code: ${data.Code}`, error);
    }
  }

  connection.pool.end();
}

const fetchAllStockData = require("../crawlers/stock"); // 爬蟲檔案
console.log("Starting the insertStockData function...");

fetchAllStockData().then((stockDataArray) => {
  insertStockData(stockDataArray).catch(console.error);
});
