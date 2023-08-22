const router = require('express').Router()

/**
 * 晴天預測
 *
 * @route GET api/weather/sunny/predict
 * @return {object} - {
 *  code: string,
 *  stock_name: string,
 *  stock_price: number,
 *  quote_change: number,
 *  weekly_quote_change: number,
 *  monthly_quote_change: number,
 *  trade volume: number,
 *  cc: number,
 *  predict_quote_change: number
 * }
 */
router.get('/weather/sunny/predict', (req, res) => {})

/**
 * 雨天預測
 *
 * @route GET api/weather/sunny/predict
 * @return {object} - {
 *  code: string,
 *  stock_name: string,
 *  stock_price: number,
 *  quote_change: number,
 *  weekly_quote_change: number,
 *  monthly_quote_change: number,
 *  trade volume: number,
 *  cc: number,
 *  predict_quote_change: number
 * }
 */
router.get('/weather/rainny/predict', (req, res) => {})

/**
 * 陰天預測
 *
 * @route GET api/weather/sunny/predict
 * @return {object} - {
 *  code: string,
 *  stock_name: string,
 *  stock_price: number,
 *  quote_change: number,
 *  weekly_quote_change: number,
 *  monthly_quote_change: number,
 *  trade volume: number,
 *  cc: number,
 *  predict_quote_change: number
 * }
 */
router.get('/weather/cloudy/predict', (req, res) => {})

// 思考大盤，時間間隔分析如何做到

module.exports = router
