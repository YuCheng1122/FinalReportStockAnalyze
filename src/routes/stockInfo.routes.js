const express = require('express')
const { stockController } = require('../controllers/index')
const router = express.Router()

/**
 * 獲取股票PB,PE
 *
 * @route api/stock/:stock_id
 * @return - {
 *  stock_id: number
 *  p_e_ratio: number
 *  p_b_ratio: number
 *  date: date
 * }
 */
router.get('/:stock_id', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let stock_id = req.params.stock_id
    const result = await stockController.getPePbController(stock_id)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取所有股票資訊
 *
 * @route api/stock/all/info
 * @return - {
 *  stock_id: number,
 *  name: string,
 *  trade_volume: number,
 *  trade_value: number,
 *  transaction: number,
 *  highest_price: number,
 *  lowest_priceL: number,
 *  opening_price: number,
 *  closing_price: number,
 *  change: number,
 *  date: date
 * }[]
 *
 */
router.get('/all/info', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const result = await stockController.getStockAllInfoController()
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
