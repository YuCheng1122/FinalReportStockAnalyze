const axios = require('axios')
const moment = require('moment-timezone')
const models = require('../models/index2')
const db = require('../config/databaseConnect')
const { handleInfo, handleError } = require('../config/log_creator')

const run = async () => {
  try {
    handleInfo({ tag: 'schedule', message: 'Started updateNews schedule' })
    const response = await axios.get(`https://serpapi.com/search?engine=google_news&gl=tw&api_key=${process.env.SERP_API_KEY}&topic_token=CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JYcG9MVlJYR2dKVVZ5Z0FQAQ`)

    const transferDataFormate = (date) => {
      const utcTime = date[0] + ', ' + date[1]
      const taiwanTime = moment.tz(utcTime, 'MM/DD/YYYY, hh:mm A', 'UTC').tz('Asia/Taipei')
      const formattedTime = taiwanTime.format('YYYY/MM/DD HH:mm:ss')
      return formattedTime
    }

    const datas = response.data.news_results
    const result = []
    for (let data of datas) {
      if (data.highlight) {
        result.push([data.highlight.title, transferDataFormate(data.highlight.date.split(',')), data.highlight.link, data.highlight.thumbnail, data.highlight.source.name, data.highlight.source.icon])
      }
      if (data.stories) {
        for (let story of data.stories) {
          result.push([story.title, transferDataFormate(story.date.split(',')), story.link, story.thumbnail, story.source.name, story.source.icon])
        }
      }
    }
    await models.googleNewsArticlesModels.insertData(result)
  } catch (error) {
    if (error.source === 'ModelError') {
      handleError(error)
    } else {
      handleError(error, 'ScheduleError', 'updateNews', 3)
    }
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await db.pool.end()
  }
}

run()
