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
 *  time: timstamp,
 *  link: string,
 *  imageSrc: string,
 *  source_name: string,
 *  source_token: string
 * }[]
 */
router.get('/all', async (req,res,next) => {
  const response_data = { success: false, data: null, errorMessage: null}
  try{
    const response = await fetchAllArticles()
    response_data.success = true
    response_data.data = response
    return res.status(200).send(response_data)
  }catch(error){
    next(error)
  }
})

/**
 * 獲取當天新聞文章
 *
 * @route /api/news/today
 * @return {Array} - {
 *  name: string,
 *  title: string,
 *  time: timestamp,
 *  link: string,
 *  imageSrc: string,
 *  source_name: string,
 *  source_token: string
 * }[]
 */
router.get('/today', async (req,res,next) => {
  const response_data = { success: false, data: null, errorMessage: null}
  try{
    const response = await fetchArticlesOfToday()
    response_data.success = true
    response_data.data = response
    return res.status(200).send(response_data)
  }catch(error){
    next(error)
  }
})

module.exports = router
