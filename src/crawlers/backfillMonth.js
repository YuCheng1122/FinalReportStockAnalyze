// One-off manual backfill utility: fetches one month of daily OHLCV data for every
// stock in targetStockIds and inserts it into stock_day_all. Not part of any scheduled
// workflow - run manually with, e.g.:
//   BACKFILL_YEAR=2026 BACKFILL_MONTH=7 DATABASE_URL=... node src/crawlers/backfillMonth.js
// Defaults to last calendar month if BACKFILL_YEAR/BACKFILL_MONTH are not set.
const axios = require('axios')
const connection = require('../config/databaseConnect')
const { targetStockIds } = require('../scripts/targetStockIds')

const now = new Date()
const defaultMonth = now.getMonth() === 0 ? 12 : now.getMonth()
const defaultYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
const year = parseInt(process.env.BACKFILL_YEAR) || defaultYear
const month = parseInt(process.env.BACKFILL_MONTH) || defaultMonth

const insertRow = (values) => {
  return new Promise((resolve) => {
    const query = 'INSERT INTO stock_day_all SET ?'
    connection.query(query, values, (error) => {
      if (error) console.error(`  insert error for stock ${values.stock_id}:`, error.message)
      resolve()
    })
  })
}

const fetchStockMonth = async (stockId) => {
  const url = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${year}${String(month).padStart(2, '0')}01&stockNo=${stockId}`
  try {
    const response = await axios.get(url)
    if (response.data.stat !== 'OK') return 0

    const rows = response.data.data.map((row) => {
      const [date, tradeVolume, tradeValue, opening, highest, lowest, closing, change, transaction] = row
      const day = date.split('/')[2]
      return {
        date: `${year}-${String(month).padStart(2, '0')}-${day}`,
        stock_id: stockId,
        trade_volume: parseInt(tradeVolume.replace(/,/g, ''), 10) || null,
        trade_value: parseInt(tradeValue.replace(/,/g, ''), 10) || null,
        opening_price: parseFloat(opening) || null,
        highest_price: parseFloat(highest) || null,
        lowest_price: parseFloat(lowest) || null,
        closing_price: parseFloat(closing) || null,
        change: parseFloat(change) || null,
        transaction: parseInt(transaction, 10) || null,
        create_date: new Date(),
        update_date: new Date(),
      }
    })

    await Promise.all(rows.map(insertRow))
    return rows.length
  } catch (error) {
    console.error(`  fetch error for stock ${stockId}:`, error.message)
    return 0
  }
}

const run = async () => {
  console.log(`Backfilling stock_day_all for ${year}-${String(month).padStart(2, '0')}, ${targetStockIds.length} stocks...`)
  let total = 0
  const uniqueIds = [...new Set(targetStockIds)]
  for (const stockId of uniqueIds) {
    const count = await fetchStockMonth(stockId)
    total += count
    console.log(`${stockId}: ${count} rows (running total: ${total})`)
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }
  console.log(`Done. Inserted ${total} rows total.`)
  connection.pool.end()
}

run()
