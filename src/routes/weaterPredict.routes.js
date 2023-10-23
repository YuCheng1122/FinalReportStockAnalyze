const router = require('express').Router()
const { weatherController } = require('../controllers/index')
const weatherVali = require('../validations/weatherPredict.validation')
const { AppError } = require('../config/error_classes')

/**
 * 天氣分析API
 *
 * @route GET api/weather/predict
 * @param {number} stock_id
 * @param {string} type {晴天、陰天、雨天、溫度、濕度、降雨量}
 * @return {object} - {
 *  stock_id: number,
 *  stock_name: string,
 *  stock_price: number,
 *  change: number,
 *  change_week: number,
 *  trade_volume: number,
 *  independent_datas: number[],
 *  dependent_datas: number[]
 * }
 */
router.get('/predict/:type/:stock_id', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = weatherVali.predictVali(req.params)
    if (valid.error) {
      throw new AppError(new Error(valid.error.details[0].message), 'RouteError', '/predice/:type/:stock_id',2)
    }

    let { stock_id, type } = req.params
    const result = await weatherController.predictStock(type, stock_id)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
