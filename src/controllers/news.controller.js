const { getAllArticles, getArticlesOfToday } = require('../models/news.model')
const { AppError } = require('../config/error_classes')

const fetchAllArticles = async () => {
  try {
    const articles = await getAllArticles()
    return articles
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'fetchAllArticles', 3)
    }
  }
}

const fetchArticlesOfToday = async () => {
  try {
    const articles = await getArticlesOfToday()
    return articles
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'fetchArticlesOfToday', 3)
    }
  }
}

module.exports = { fetchAllArticles, fetchArticlesOfToday }
