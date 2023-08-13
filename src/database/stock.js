const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const mysql = require("mysql2/promise");
const connectionConfig = {
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
};

async function insertStockData(stockData) {
  fetchAllStockData().then((stockDataArray) => {
    if (!Array.isArray(stockDataArray)) {
      console.error("The data fetched is not an array:", stockDataArray);
      return;
    }
    insertStockData(stockDataArray).catch(console.error);
  });

  const connection = await mysql.createConnection(connectionConfig);
  const sql = `
        INSERT INTO Stock (code, trade_value, opening_price, highest_price, lowest_price, closing_price, price_change, trade_volume, transaction, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  let processedCount = 0; // 初始化已處理的股票數量

  for (let data of stockData) {
    try {
      await connection.execute(sql, [
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

  await connection.end();
}

const fetchAllStockData = require("../crawlers/stock"); // 爬蟲檔案
console.log("Starting the insertStockData function...");

fetchAllStockData().then((stockDataArray) => {
  insertStockData(stockDataArray).catch(console.error);
});
