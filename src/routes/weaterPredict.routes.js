const router = require('express').Router()

/**
 * 預測明日股價
 *
 * @route GET api/weather/predict/:type
 * @return {object} - {
 *  code: string,
 *  stock_name: string,
 *  stock_price: number,
 *  quote_change_percent: number,
 *  trade volume: number,
 *  cc: number,
 *  predict_quote_change: number
 * }
 */
router.get('/predict:type', (req, res) => {})

/**
 * 預測3日後股價
 *
 * @route GET api/weather/predict/three/type
 * @return {object} - {
 *  code: string,
 *  stock_name: string,
 *  stock_price: number,
 *  quote_change_percent: number,
 *  trade volume: number,
 *  cc: number,
 *  predict_quote_change: number
 * }
 */
router.get('/predict/three/:type', (req, res) => {})

/**
 * 預測1週後股價
 *
 * @route GET api/weather/predict/week/type
 * @return {object} - {
 *  code: string,
 *  stock_name: string,
 *  stock_price: number,
 *  quote_change_percent: number,
 *  trade volume: number,
 *  cc: number,
 *  predict_quote_change: number
 * }
 */
router.get('/predict/week/type', (req, res) => {})

/**
 * 預測大盤分析
 *
 * @route GET api/weather/predict/stockmarket/time/type
 * @return {object} - {
 *  weighted_index: number,
 *  date: string,
 *  predict_quote_change: number
 * }
 */
router.get('/predict/stockmarket/:time/:type', (req, res) => {})

module.exports = router
