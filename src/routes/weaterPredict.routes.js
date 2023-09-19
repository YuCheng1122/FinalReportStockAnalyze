const router = require('express').Router()
const { weatherController } = require('../controllers/index')

/**
 * 預測大盤
 *
 * @route GET api/weather/predict/fmtqik/:type (sunny,rainy,cloudy)/timestamp (one,three,week)
 * @return {object} - {
 *  predict_rate: number
 * }
 */
router.get('/predict/fmtqik/:type/:timestamp', async (req, res) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let type = req.params.type
    let timestamp = req.params.timestamp
    let results = await weatherController.predictFmtqik(type, timestamp)
    response_data.success = true
    response_data.data = results
  } catch (error) {
    console.log(error)
    response_data.errorMessage = error.message
  }
  return res.status(200).send(response_data)
})

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
 * @route GET /correlation/coefficient/:independent/:dependent
 * @return {object} - {
 *  cc: number
 * }
 */
router.get('/correlation/coefficient/:independent/:dependent', async (req, res) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let independent = req.params.independent
    let dependent = req.params.dependent
    let result = await weatherController.weatherCC(independent, dependent)
    response_data.success = true
    response_data.data = result
  } catch (error) {
    response_data.errorMessage = error.message
  }
  return res.status(200).send(response_data)
})

module.exports = router
