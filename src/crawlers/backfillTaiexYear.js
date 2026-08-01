// One-off manual backfill utility: fetches TAIEX daily closing data for the last N
// months and inserts into taiex_data. Not part of any scheduled workflow.
//
// The daily cron (src/scripts/updateTaiexData.js) uses TWSE's MI_5MINS_HIST endpoint,
// which gives true OHLC but only ever returns the latest trading day - it ignores the
// `date` query param entirely, so it cannot be used for historical backfill (this bit
// us: an earlier backfill attempt inserted the same day's data under every date).
//
// This script uses TWSE's FMTQIK endpoint instead, which genuinely respects `date`
// (YYYYMM01) and returns every trading day in that month in one call. It only reports
// a closing index + day-over-day change, not full OHLC, so opening/highest/lowest are
// set equal to closing for these backfilled rows (flat candles - the closing-price
// trend line is accurate, only the candlestick shape is approximated). Going forward,
// each new day inserted by the real daily cron will have true OHLC.
//
// Usage: BACKFILL_MONTHS=12 DATABASE_URL=... node src/crawlers/backfillTaiexYear.js
const axios = require('axios')
const models = require('../models/index2')
const db = require('../config/databaseConnect')

const monthsBack = parseInt(process.env.BACKFILL_MONTHS) || 12

const fetchMonth = async (year, month) => {
  const dateParam = `${year}${String(month).padStart(2, '0')}01`
  try {
    const response = await axios.get(`https://www.twse.com.tw/en/exchangeReport/FMTQIK?response=json&date=${dateParam}`)
    const rows = response.data.data
    if (!rows || !Array.isArray(rows)) return 0

    let inserted = 0
    for (const row of rows) {
      const [date, , , , closingIndexRaw, changeRaw] = row
      const closingIndex = parseFloat(closingIndexRaw.replace(/,/g, ''))
      if (isNaN(closingIndex)) continue

      const result = [date, closingIndex, closingIndex, closingIndex, closingIndex, new Date(), new Date()]
      await models.taiexModels.insertData(result)
      inserted++
    }
    return inserted
  } catch (error) {
    console.error(`  ${year}-${String(month).padStart(2, '0')}: error`, error.message)
    return 0
  }
}

const run = async () => {
  console.log(`Backfilling taiex_data for the last ${monthsBack} months...`)
  const now = new Date()
  let total = 0

  for (let i = 1; i <= monthsBack; i++) {
    const target = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = target.getFullYear()
    const month = target.getMonth() + 1
    const count = await fetchMonth(year, month)
    total += count
    console.log(`${year}-${String(month).padStart(2, '0')}: ${count} days inserted (running total: ${total})`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  console.log(`Done. Inserted ${total} rows total.`)
  db.pool.end()
}

run()
