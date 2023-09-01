//天氣和大盤指數的分析，有相關係數、月平均交易量、顯著水準、異常值。
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

function pearsonCorrelation(x, y, significanceLevel = 0.05) {
  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
    sumY2 += y[i] * y[i];
  }

  const numerator = sumXY - (sumX * sumY) / n;
  const denominator = Math.sqrt((sumX2 - (sumX * sumX) / n) * (sumY2 - (sumY * sumY) / n));

  if (denominator === 0) return 0;

  const correlation = numerator / denominator;
  const isSignificant = Math.abs(correlation) > significanceLevel;

  console.log(`Correlation: ${correlation}, Significance Level: ${significanceLevel}, Is Significant: ${isSignificant}`);
  return correlation;
}

const doQueries = async () => {
  try {
    const [priceResults, precipitationResults] = await Promise.all([
      new Promise((resolve, reject) => {
        connection.query('SELECT date, price FROM fmtqik', (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      }),
      new Promise((resolve, reject) => {
        connection.query('SELECT date, precipitation FROM weather', (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      })
    ]);

    const priceData = priceResults.map(row => row.price);
    const precipitationData = precipitationResults.map(row => row.precipitation);
    const correlation = pearsonCorrelation(priceData, precipitationData, 0.05);
    console.log('Correlation between daily price and precipitation:', correlation);

    // Trend Analysis
    connection.query('SELECT MONTH(date) as month, AVG(trade_volume) as avg_trade_volume FROM fmtqik GROUP BY MONTH(date)', (err, results) => {
      if (err) throw err;
      console.log('Trend Analysis - Average Trade Volume per Month:', results);
    });

    // Anomaly Detection
    connection.query('SELECT * FROM fmtqik WHERE trade_volume > (SELECT AVG(trade_volume) FROM fmtqik) * 1.5', (err, results) => {
      if (err) throw err;
      console.log('Anomaly Detection - Number of High Trade Volume Records:', results.length);
    });

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