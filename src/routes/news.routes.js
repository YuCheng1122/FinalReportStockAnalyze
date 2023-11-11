const express = require('express')
const { fetchAllArticles, fetchArticlesOfToday } = require('../controllers/news.controller')

const router = express.Router()

/**
 * 獲取所有新聞文章
 *
 * @route /api/news/all
 * @return {Array} - {
 *  name: string,
 *  title: string,
 *  time: string,
 *  link: string,
 *  imageSrc: string,
 *  update_date: date
 * }[]
 */
router.get('/all', fetchAllArticles)

/**
 * 獲取當天新聞文章
 *
 * @route /api/news/today
 * @return {Array} - {
 *  name: string,
 *  title: string,
 *  time: string,
 *  link: string,
 *  imageSrc: string,
 * }[]
 */
router.get('/today', fetchArticlesOfToday)

module.exports = router
