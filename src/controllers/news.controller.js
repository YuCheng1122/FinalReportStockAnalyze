const { getAllArticles, getArticlesOfToday } = require('../models/news.model')
const { AppError } = require('../config/error_classes')

const fetchAllArticles = async (req, res) => {
  try {
    const articles = await getAllArticles()
    res.status(200).json({ data: articles })
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'fetchAllArticles', 3)
    }
  }
}

const fetchArticlesOfToday = async (req, res) => {
  try {
    const articles = await getArticlesOfToday()
    res.status(200).json({ data: articles })
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'fetchArticlesOfToday', 3)
    }
  }
}

module.exports = { fetchAllArticles, fetchArticlesOfToday }
