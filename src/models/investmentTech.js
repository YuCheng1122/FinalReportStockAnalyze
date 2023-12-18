const { resourceLimits } = require('worker_threads')
const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

//Warren Buffett debtRatio < 30%
const getFinancialData = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
    b.stock_id, 
    s.name, 
    b.ROE, 
    sd_latest.closing_price,
    i.eps,
    i.epsYoY,
    fs.link
FROM 
    balancesheetliabilitiesequity b
JOIN 
    stock s ON b.stock_id = s.stock_id
JOIN 
    (SELECT stock_id, MAX(date) AS latest_date FROM stock_day_all WHERE YEAR(date) = 2023 GROUP BY stock_id) sd_max_date ON b.stock_id = sd_max_date.stock_id
JOIN 
    (SELECT stock_id, closing_price, date FROM stock_day_all) sd_latest ON sd_max_date.stock_id = sd_latest.stock_id AND sd_max_date.latest_date = sd_latest.date
JOIN 
    (SELECT stock_id, eps, epsYoY FROM incomestatements WHERE year = 2023 AND quarter = 3) i ON b.stock_id = i.stock_id
JOIN 
    (SELECT stock_id, link FROM financial_statement WHERE year = 2023 AND season = 3) fs ON b.stock_id = fs.stock_id
WHERE 
    CAST(b.debtRatio AS DECIMAL(10, 2)) < 30 
    AND b.year = 2023
    AND b.quarter = 3
ORDER BY 
    CAST(i.eps AS DECIMAL(10, 2)) DESC
LIMIT 5;

      `

    db.query(sql, (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'getFinancialData', 4))
      } else {
        resolve(result)
      }
    })
  })
}
//Warren Buffett ROE > 15%
const getHighROEFinancialData = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
    b.stock_id, 
    s.name, 
    b.ROE, 
    sd_latest.closing_price,
    i.eps,
    i.epsYoY,
    fs.link
FROM 
    balancesheetliabilitiesequity b
JOIN 
    stock s ON b.stock_id = s.stock_id
JOIN 
    (SELECT stock_id, MAX(date) AS latest_date FROM stock_day_all WHERE YEAR(date) = 2023 GROUP BY stock_id) sd_max_date ON b.stock_id = sd_max_date.stock_id
JOIN 
    (SELECT stock_id, closing_price, date FROM stock_day_all) sd_latest ON sd_max_date.stock_id = sd_latest.stock_id AND sd_max_date.latest_date = sd_latest.date
JOIN 
    (SELECT stock_id, eps, epsYoY FROM incomestatements WHERE year = 2023 AND quarter = 3) i ON b.stock_id = i.stock_id
JOIN 
    (SELECT stock_id, link FROM financial_statement WHERE year = 2023 AND season = 3) fs ON b.stock_id = fs.stock_id
WHERE 
    b.ROE > 1.5
    AND b.year = 2023
    AND b.quarter = 3
ORDER BY 
    CAST(i.eps AS DECIMAL(10, 2)) DESC
LIMIT 5;

      `

    db.query(sql, (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'getHighROEFinancialData', 4))
      } else {
        resolve(result)
      }
    })
  })
}
//Warren Buffett Free Cash Flow > 0
const getPositiveCashFlowData = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
    filtered_data.stock_id, 
    filtered_data.name, 
    filtered_data.ROE, 
    filtered_data.closing_price,
    filtered_data.eps,
    filtered_data.epsYoY,
    filtered_data.link
FROM (
    SELECT 
        b.stock_id, 
        s.name, 
        b.ROE, 
        sd_latest.closing_price,
        i.eps,
        i.epsYoY,
        fs.link
    FROM 
        balancesheetliabilitiesequity b
    JOIN 
        stock s ON b.stock_id = s.stock_id
    JOIN 
        (SELECT stock_id, MAX(date) AS latest_date FROM stock_day_all WHERE YEAR(date) = 2023 GROUP BY stock_id) sd_max_date ON b.stock_id = sd_max_date.stock_id
    JOIN 
        (SELECT stock_id, closing_price, date FROM stock_day_all) sd_latest ON sd_max_date.stock_id = sd_latest.stock_id AND sd_max_date.latest_date = sd_latest.date
    JOIN 
        (SELECT stock_id, eps, epsYoY FROM incomestatements WHERE year = 2023 AND quarter = 3) i ON b.stock_id = i.stock_id
    JOIN 
        (SELECT stock_id, link FROM financial_statement WHERE year = 2023 AND season = 3) fs ON b.stock_id = fs.stock_id
    JOIN 
        (SELECT stock_id FROM cashflowstatement WHERE freeCashFlow NOT LIKE '%-%' AND freeCashFlow IS NOT NULL AND freeCashFlow <> '' AND YEAR=2023 AND QUARTER=3) cfs ON b.stock_id = cfs.stock_id
    WHERE 
        b.year = 2023
        AND b.quarter = 3
) AS filtered_data
ORDER BY 
    CAST(filtered_data.eps AS DECIMAL(10, 2)) DESC
LIMIT 5;

    `

    db.query(sql, (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'getPositiveCashFlowData', 4))
      } else {
        resolve(result)
      }
    })
  })
}
//Benjamin Graham currentRatio > 200%
const getFinancialDataWithCurrentRatio = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM (
    SELECT 
        b.stock_id, 
        s.name, 
        b.ROE, 
        sd_latest.closing_price,
        i.eps,
        i.epsYoY,
        fs.link,
        ast.currentRatio
    FROM 
        balancesheetliabilitiesequity b
    JOIN 
        stock s ON b.stock_id = s.stock_id
    JOIN 
        (SELECT stock_id, MAX(date) AS latest_date FROM stock_day_all WHERE YEAR(date) = 2023 GROUP BY stock_id) sd_max_date ON b.stock_id = sd_max_date.stock_id
    JOIN 
        (SELECT stock_id, closing_price, date FROM stock_day_all) sd_latest ON sd_max_date.stock_id = sd_latest.stock_id AND sd_max_date.latest_date = sd_latest.date
    JOIN 
        (SELECT stock_id, eps, epsYoY FROM incomestatements WHERE year = 2023 AND quarter = 3) i ON b.stock_id = i.stock_id
    JOIN 
        (SELECT stock_id, link FROM financial_statement WHERE year = 2023 AND season = 3) fs ON b.stock_id = fs.stock_id
    JOIN 
        (SELECT stock_id, currentRatio FROM assetstatements WHERE currentRatio > 200 AND YEAR=2023 AND QUARTER=3) ast ON b.stock_id = ast.stock_id
    WHERE 
        b.year = 2023
        AND b.quarter = 3
) AS subquery
ORDER BY 
    CAST(subquery.eps AS DECIMAL(10, 2)) DESC
LIMIT 5;

    `

    db.query(sql, (error, results) => {
      if (error) {
        reject(new AppError(error, 'Model', 'getFinancialDataWithCurrentRatio', 4))
      } else {
        const processedResults = results.map((result) => {
          return { ...result, currentRatio: result.currentRatio + '%' }
        })
        resolve(processedResults)
      }
    })
  })
}
//Benjamin Graham eps > 0
const getFinancialData2023Q3 = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
    b.stock_id, 
    s.name, 
    b.ROE, 
    sd_latest.closing_price,
    i.eps,
    i.epsYoY,
    fs.link
FROM 
    balancesheetliabilitiesequity b
JOIN 
    stock s ON b.stock_id = s.stock_id
JOIN 
    (SELECT stock_id, MAX(date) AS latest_date FROM stock_day_all WHERE YEAR(date) = 2023 GROUP BY stock_id) sd_max_date ON b.stock_id = sd_max_date.stock_id
JOIN 
    (SELECT stock_id, closing_price, date FROM stock_day_all) sd_latest ON sd_max_date.stock_id = sd_latest.stock_id AND sd_max_date.latest_date = sd_latest.date
JOIN 
    (SELECT stock_id, eps, epsYoY FROM incomestatements WHERE year = 2023 AND quarter = 3 AND eps > 0) i ON b.stock_id = i.stock_id
JOIN 
    (SELECT stock_id, link FROM financial_statement WHERE year = 2023 AND season = 3) fs ON b.stock_id = fs.stock_id
WHERE 
    b.year = 2023
    AND b.quarter = 3
ORDER BY 
    CAST(i.eps AS DECIMAL(10, 2)) DESC
LIMIT 5;
      `

    db.query(sql, (error, results) => {
      if (error) {
        reject(new AppError(error, 'Model', 'getFinancialData2023Q3', 4))
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { getFinancialData, getHighROEFinancialData, getFinancialDataWithCurrentRatio, getPositiveCashFlowData, getFinancialData2023Q3}
