const router = require('express').Router()
const { weatherController } = require('../controllers/index')

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

/**
 * 回歸分析
 *
 * @route GET api/weather/linear/regression/:independent/:dependent
 * @return {object} - {
 *  'slope': number,
 *  'intercept': number
 * }
 */
router.get('/linear/regression/:independent/:dependent', async (req, res) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let independent = req.params.independent
    let dependent = req.params.dependent

    let result = await weatherController.weahterRegression(independent, dependent)
    response_data.data = result
    response_data.success = true
  } catch (error) {
    console.log(error)
    response_data.errorMessage = error.message
  }
  return res.status(200).send(response_data)
})

/**
 * 核回歸分析
 *
 * @route GET api/weather/automic/regression/:independent/:dependent
 * @return {object} - {
 *  predicted_number: number
 * }
 */
router.get('/automic/regression/:independent/:dependent', async (req, res) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let independent = req.params.independent
    let dependent = req.params.dependent
    await weatherController.weatherAutomicRegression(independent, dependent)
    response_data.success = true
  } catch (error) {
    response_data.errorMessage = error.message
  }
  return res.status(200).send(response_data)
})

/**
 * 相關係數分析
 * 
 * 
 * 
 */


/**
 * 主成分分析
 * 
 * 
 */


/**
 * 貝葉斯回歸
 * 
 * 
 */


/**
 * 
 * 
 * 
 */




module.exports = router
