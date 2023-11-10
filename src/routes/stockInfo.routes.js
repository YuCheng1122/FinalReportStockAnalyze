const express = require('express')
const {getStockInfoController} = require('../controllers/stock.controller') 
const router = express.Router()

// 獲取股票資訊
router.get('/stock/:stock_id', getStockInfoController);

module.exports = router


