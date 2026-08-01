// One-off manual backfill utility: fetches TAIEX daily closing data for the last N
// months and inserts into taiex_data. Not part of any scheduled workflow.
//
// The daily cron (src/scripts/updateTaiexData.js) uses TWSE's MI_5MINS_HIST endpoint,
// which gives true OHLC but only ever returns the latest trading day - it ignores the
// `date` query param entirely, so it cannot be used for historical backfill (this bit
// us once already: an earlier attempt inserted the same day's data under every date).
//
// This script uses TWSE's FMTQIK endpoint instead, which genuinely respects `date`
// (YYYYMM01) and returns every trading day in that month in one call. It only reports
// a closing index, not full OHLC. Setting open=high=low=close per day (the first
// version of this script) renders as a zero-height sliver in a candlestick chart -
// visually a scatter of dots instead of candles. Instead, each day's opening_index is
// approximated as the *previous* trading day's close (a standard approximation when
// only daily closes are available), with high/low set to max/min(open, close) - real
// candle bodies colored by day-over-day movement, just without upper/lower wicks
// (there's no true intraday high/low in this data source). Days inserted by the real
// daily cron going forward carry true OHLC from MI_5MINS_HIST.
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
    if (!rows || !Array.isArray(rows)) return []

    return rows
      .map((row) => {
        const [date, , , , closingIndexRaw] = row
        const closingIndex = parseFloat(closingIndexRaw.replace(/,/g, ''))
        return isNaN(closingIndex) ? null : { date, closingIndex }
      })
      .filter(Boolean)
  } catch (error) {
    console.error(`  ${year}-${String(month).padStart(2, '0')}: error`, error.message)
    return []
  }
}

const run = async () => {
  console.log(`Fetching taiex_data for the last ${monthsBack} months...`)
  const now = new Date()
  let days = []

  for (let i = monthsBack; i >= 1; i--) {
    const target = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = target.getFullYear()
    const month = target.getMonth() + 1
    const monthDays = await fetchMonth(year, month)
    days = days.concat(monthDays)
    console.log(`${year}-${String(month).padStart(2, '0')}: ${monthDays.length} days fetched`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  days.sort((a, b) => new Date(a.date.replace(/\//g, '-')) - new Date(b.date.replace(/\//g, '-')))

  console.log(`Inserting ${days.length} rows with derived open/high/low...`)
  let previousClose = null
  let inserted = 0
  for (const { date, closingIndex } of days) {
    const opening = previousClose !== null ? previousClose : closingIndex
    const highest = Math.max(opening, closingIndex)
    const lowest = Math.min(opening, closingIndex)
    const result = [date, opening, highest, lowest, closingIndex, new Date(), new Date()]
    await models.taiexModels.insertData(result)
    previousClose = closingIndex
    inserted++
  }

  console.log(`Done. Inserted ${inserted} rows total.`)
  db.pool.end()
}

run()
