const express = require('express')
const { fetchAllArticles, fetchArticlesOfToday } = require('../controllers/news.controller') // 請將 'yourControllerFile' 替換為您的控制器檔案名稱

const router = express.Router()

// 獲取所有新聞文章的路由
router.get('/all', fetchAllArticles)

// 獲取當天新聞文章的路由
router.get('/today', fetchArticlesOfToday)

module.exports = router
