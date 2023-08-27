const router = require('express').Router()

/**
 * 獲取所有產業別
 *
 * @route GET /api/stock/all/industy
 * @return {object} - {
 *  industy_array: string[]
 * }
 */
router.get('/all/industy', (req, res) => {})

/**
 * 推薦產業別股票
 *
 * @route GET /api/stock/recommend/industry
 * @return {object} - {
 *  stock_id: string,
 *  stock_name: string,
 *  predict_change_percent: number
 * }[]
 */
router.get('/recommend/:industry', (req, res) => {})

/**
 * 回傳KD金叉與死叉參數(KD Golden Cross and Death Cross)
 *
 * @route GET /api/stock/base/analysis/1
 * @return {object} - {
 *  k_value: number[]
 *  d_value: number[]
 *  j_value: number[]
 *  five_days_average: number[]
 *  ten_days_average: number[]
 *  fourteen_days_average: number[]
 *  date: string
 * }
 */
router.get('/base/analysis/1', (req, res) => {})

/**
 * 回傳5/20日均線參數(5/20-day moving average)
 *
 * @route GET /api/stock/base/analysis/2
 * @return {object} - {
 *  closing_price: number[]
 *  five_days_average: number[]
 *  twenty_days_average: number[]
 *  data: string
 * }
 */
router.get('/base/analysis/2', (req, res) => {})

/**
 * 回傳14日均線+DI/DI參數(14-day moving average + DI/DI)
 *
 * @route GET /api/stock/base/analysis/3
 * @return {object} - {
 *  stock_data_array: {
 *    opening_price: number,
 *    closing_price: number,
 *    highest_price: number,
 *    lowest_price: number,
 *    date: string
 *  }[],
 *  di_method: string,
 *  di_days: number
 * }
 */
router.get('/base/analysis/3', (req, res) => {})

/**
 * 回傳10日三方指標參數(10-day three-party indicator)
 *
 * @route GET /api/stock/base/analysis/4
 * @return {object} - {
 *
 * }
 */
router.get('/base/analysis/4', (req, res) => {})

/**
 * 回傳股價突破月線參數(stock price breaks through monthly line)
 *
 * @route GET /api/stock/base/analysis/5
 * @return {object} - {
 *  stock_data_array: {
 *    opening_price: number,
 *    closing_price: number,
 *    highest_price: number,
 *    lowest_price: number,
 *    date: string
 *  }[]
 *  ma_method: string, (移動平均線計算方法)
 *  ma_days: number
 * }
 */
router.get('/base/analysis/5', (req, res) => {})

/**
 * 回傳股價突破布林上軌參數(stock price breaks through Bollinger upper track)
 *
 * @route GET /api/stock/base/analysis/6
 * @return {object} - {
 *  stock_data_array: {
 *    opening_price: number,
 *    closing_price: number,
 *    highest_price: number,
 *    lowest_price: number,
 *    date: string
 *  }[],
 *  bb_method: string,
 *  bb_days: number,
 *  bb_stddev_multiplier: number
 * }
 */
router.get('/base/analysis/6', (req, res) => {})

/**
 * 回傳股價突破肯特納上軌參數(stock price breaks through Keltner upper track)
 *
 * @route GET /api/stock/base/analysis/7
 * @return {object} - {
 *  stock_data_array: {
 *    opening_price: number,
 *    closing_price: number,
 *    highest_price: number,
 *    lowest_price: number,
 *    date:string
 *  }[],
 *  kc_method: string,
 *  kc_days: string,
 *  kc_atr_multiplier: number
 * }
 */
router.get('/base/analysis/7', (req, res) => {})

/**
 * 回傳CCI突破/跌破100參數(CCI breaks through/falls below 100)
 *
 * @route GET /api/stock/base/analysis/8
 * @return {object} - {
 *  stock_data_array: {
 *    opening_price: number,
 *    closing_price: number,
 *    highest_price: number,
 *    lowest_price: number,
 *    date: string
 *  }[],
 * cci_method: string,
 * cci_days: number
 * }
 */
router.get('/base/analysis/8', (req, res) => {})

module.exports = router
