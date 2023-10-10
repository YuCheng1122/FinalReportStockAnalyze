const router = require('express').Router()
const { weatherController } = require('../controllers/index')
const weatherVali = require('../validations/weatherPredict.validation')

/**
 * 預測大盤
 *
 * @route GET api/weather/predict/fmtqik/:type (sunny,rainy,cloudy)/timestamp (one,three,week)
 * @return {object} - {
 *  predict_rate: number
 * }
 */
router.get('/predict/fmtqik/:type/:timestamp', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = weatherController.predictFmtqik(req.params)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    let results = await weatherController.predictFmtqik(req.params.type, req.params.timestamp)
    response_data.success = true
    response_data.data = results
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
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
router.get('/linear/regression/:independent/:dependent', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = weatherController.predictFmtqik(req.params)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    let result = await weatherController.weahterRegression(req.params.independent, req.params.dependent)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

/**
 * 核回歸分析
 *
 * @route GET api/weather/automic/regression/:independent/:dependent
 * @return {object} - {
 *  predicted_number: number
 * }
 */
router.get('/automic/regression/:independent/:dependent', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = weatherController.predictFmtqik(req.params)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    response_data.data = await weatherController.weatherAutomicRegression(req.params.independent, req.params.dependent)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

/**
 * 相關係數分析
 *
 * @route GET /correlation/coefficient/:independent/:dependent
 * @return {object} - {
 *  cc: number
 * }
 */
router.get('/correlation/coefficient/:independent/:dependent', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = weatherController.predictFmtqik(req.params)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    let result = await weatherController.weatherCC(req.params.independent, req.params.dependent)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

module.exports = router
