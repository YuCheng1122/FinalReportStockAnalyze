const schedule = require('node-schedule')
const puppeteer = require('puppeteer')
const axios = require('axios')
const models = require('./models/index2')
const { handleInfo, handleError } = require('./config/log_creator')

const targetStockIds = ['2408', '2454', '3231', '3443', '2912', '3008', '3045', '4904', '4938', '6505', '9904', '1227', '1319', '1440', '1477', '1504', '1536', '1605', '1707', '1717', '1722', '1723', '1789', '1802', '2015', '2049', '2059', '2101', '2103', '2106', '2201', '2204', '2206', '2231', '2313', '2327', '2345', '2347', '2352', '2353', '2355', '2356', '2360', '2362', '2376', '2377', '2379', '2383', '2385', '2392', '2408', '2449', '2451', '2498', '2542', '2603', '2609', '2610', '2615', '2618', '2707', '2809', '2812', '2867', '2903', '2915', '3034', '3037', '3044', '3189', '3231', '3682', '4958', '5522', '6176', '6239', '6269', '6285', '6414', '6456', '8150', '8454', '8464', '9907', '9910', '9917', '9921', '9933', '9938', '9945', '1101', '1102', '1216', '1301', '1303', '1326', '1402', '1476', '2002', '2105', '2207', '2301', '2303', '2308', '2317', '2324', '2330', '2354', '2357', '2382', '2395', '2408', '2409', '2412', '2474']

// BWIBBU(每日本意比)
const updateBwibbu = schedule.scheduleJob('* 0 * * *', async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateBwibbu schedule' })
    const response = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL')
    const today = new Date()
    const data = response.data
    const result =
      data &&
      Array.isArray(data) &&
      data
        .filter((item) => targetStockIds.includes(item.Code))
        .map((item) => {
          return [parseInt(item.Code), item.Name, parseFloat(item.PEratio) || null, parseFloat(item.DividendYield) || null, parseFloat(item.PBratio) || null, today.toLocaleDateString()]
        })
    if (result) await models.bwibbuAllModels.insertData(result)
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateBwibbu', 3)
    }
  }
})

// stock_day_all(每日股價資訊])
const updateStockDayAll = schedule.scheduleJob('* 0 * * *', async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateStockDayAll schedule' })
    const response = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL')
    const today = new Date()
    const data = response.data
    const result =
      data &&
      Array.isArray(data) &&
      data
        .filter((item) => targetStockIds.includes(item.Code))
        .map((item) => {
          return [parseInt(item.Code) || null, parseInt(item.TradeVolume) || null, parseInt(item.TradeValue) || null, parseFloat(item.OpeningPrice) || null, parseFloat(item.HighestPrice) || null, parseFloat(item.LowestPrice) || null, parseFloat(item.ClosingPrice) || null, parseFloat(item.Change) || null, parseInt(item.Transaction) || null, today.toLocaleDateString()]
        })
    console.log(result)
    if (result) await models.stockDayAllModels.insertData(result)
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateStockDayAll', 3)
    }
  }
})

// news (每日新聞)
const updateNews = schedule.scheduleJob('* 0 * * *', async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateNews schedule' })
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JYcG9MVlJYR2dKVVZ5Z0FQAQ?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant')
    const articles = await page.evaluate(() => {
      const articleNodes = document.querySelectorAll('article.IFHyqb.DeXSAc')
      const results = []

      articleNodes.forEach((article) => {
        const titleElement = article.querySelector('h4.JtKRv')
        const title = titleElement ? titleElement.textContent : ''

        const timeElement = article.querySelector('time.hvbAAd')
        const time = timeElement ? timeElement.textContent : ''

        const linkElement = article.querySelector('a.WwrzSb')
        const link = linkElement ? linkElement.getAttribute('href').replace('./', 'https://news.google.com/') : ''

        const imgElement = article.querySelector('img.Quavad')
        const imageSrc = imgElement ? imgElement.getAttribute('srcset') : ''

        results.push([title, time, link, imageSrc])
      })
      return results
    })
    await models.googleNewsArticlesModels.insertData(articles)
    await browser.close()
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateStockDayAll', 3)
    }
  }
})

// individual_news (每日個股新聞)
// const updateIndividualNews = schedule.scheduleJob('* * 1 * *', async () => {
//   try {
//     handleInfo({ tag: 'schedule', message: 'Started updateIndividualNews schedule' })
//     const result = []
//     for (let stock_id of targetStockIds) {
//       const response = await axios.get(`https://serpapi.com/search.json?engine=google_finance&hl=zh-tw&q=${stock_id}%3ATPE&api_key=${process.env.SERP_API_KEY}`)
//       const newsData = response.data.news_results
//       newsData.map((item) => {
//         result.push([stock_id, item.snippet, item.date, item.link, item.thumbnail])
//       })
//     }
//     await models.individualNewModels.insertData(result)
//   } catch (error) {
//     if (error.source === 'ModelError') {
//       handleError(error)
//     } else {
//       handleError(error, 'ScheduleError', 'updateIndividualNews', 3)
//     }
//   }
// })

// mi_index (每日產業指數)
const updateMiIndex = schedule.scheduleJob('* 0 * * *', async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateMiIndex schedule' })
    const response = await axios.get('https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX')
    const data = response.data
    const result =
      data &&
      Array.isArray(data) &&
      data.map((item) => {
        return [item['指數'], parseFloat(item['收盤指數']), item['漲跌'], parseFloat(item['漲跌點數']), parseFloat(item['漲跌百分比']), item['特殊處理註記'], new Date(), new Date()]
      })

    if (result) await models.miIndexModels.insertData(result)
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateMiIndex', 3)
    }
  }
})

const updateTaiexData = schedule.scheduleJob('* 0 * * *', async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateTaiexData schedule' })
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 月份是從 0 開始的，所以要加 1
    const day = String(currentDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}${month}${day}`
    const response = await axios.get(`https://www.twse.com.tw/rwd/en/TAIEX/MI_5MINS_HIST?date=${formattedDate}&response=json&_=170039420045`)
    if (response.data.stat === 'OK') {
      const data = response.data.data
      const [date, openingIndex, highestIndex, lowestIndex, closingIndex] = data[data.length-1]
      const result = [
        date,
        parseFloat(openingIndex.replace(/,/g, '')),
        parseFloat(highestIndex.replace(/,/g, '')),
        parseFloat(lowestIndex.replace(/,/g, '')),
        parseFloat(closingIndex.replace(/,/g, '')),
        new Date(),
        new Date()
      ]
      console.log(result)
      if (result) await models.taiexModels.insertData(result)
    }
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateTaiexData', 3)
    }
  }
})

// const updateWeather = schedule.scheduleJob('* * 1 * *', () => {
//   try {
//     handleInfo({ tag: 'schedule', message: 'Started updateWeather schedule' })
//   } catch (error) {}
// })

module.exports = { updateBwibbu, updateStockDayAll, updateNews, updateIndividualNews, updateMiIndex, updateTaiexData, updateWeather }

// 修改mi_index, taoex_data的create_date,update_date格式
// 補資料與刪資料，再開始嘗試
