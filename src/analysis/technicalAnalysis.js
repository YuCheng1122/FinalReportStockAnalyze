const mysql = require('mysql');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const dbConfig = {
  host: 'localhost',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
};

const connection = mysql.createConnection({
  ...dbConfig,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
});

const saveToDatabase = (stockId, weaklyAvg, avg20, avg60, date) => {
  const query = 'INSERT INTO technical_analysis (stock_id, date, weaklyAvg, avg20, avg60) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [stockId, date, weaklyAvg, avg20, avg60], (err, results) => {
    if (err) throw err;
    console.log(`Data for stock ID ${stockId} on date ${date} inserted.`);
  });
};

const calculateMovingAverage = (data, days) => {
  const result = [];
  for (let i = 0; i <= data.length - days; i++) {
    const slice = data.slice(i, i + days);
    const sum = slice.reduce((acc, val) => acc + val, 0);
    result.push(sum / days);
  }
  return result;
};

const doQueries = async () => {
  try {
    const stockIds = ['1101'];
    for (const stockId of stockIds) {
      const query = `SELECT date, closing_price FROM stock_day_all WHERE stock_id = ${stockId} ORDER BY date ASC`;
      connection.query(query, (err, results) => {
        if (err) throw err;
        const dates = results.map(row => row.date.toISOString().split('T')[0]);
        const closingPrices = results.map(row => parseFloat(row.closing_price));
        const weaklyAvg = calculateMovingAverage(closingPrices, 5);
        const avg20 = calculateMovingAverage(closingPrices, 20);
        const avg60 = calculateMovingAverage(closingPrices, 60);
        
        for (let i = 0; i < dates.length; i++) {
          saveToDatabase(stockId, weaklyAvg[i] || null, avg20[i] || null, avg60[i] || null, dates[i]);
        }
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  doQueries();
});
