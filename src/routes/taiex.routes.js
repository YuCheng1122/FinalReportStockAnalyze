const express = require('express')
const { getTaiexDataByDateController, getAllTaiexDataController } = require('../controllers/taiex.controller')

const router = express.Router()

/**
 * 獲取特定日期的 TAIEX 數據
 *
 * @route GET /api/taiex/date/{date}
 * @param {string} date - 日期，格式為 YYYYMMDD
 * @return {Object} - {
 *  date: string,
 *  opening_index: number,
 *  highest_index: number,
 *  lowest_index: number,
 *  closing_index: number,
 *  create_date: date,
 *  update_date: date
 * }
 */
router.get('/date/:date', async (req, res, next) => {
  try {
    const result = await getTaiexDataByDateController(req.params.date)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取所有 TAIEX 數據
 *
 * @route GET /api/taiex/all
 * @return {Array} - [{
 *  date: string,
 *  opening_index: number,
 *  highest_index: number,
 *  lowest_index: number,
 *  closing_index: number,
 *  create_date: date,
 *  update_date: date
 * }]
 */
router.get('/all', async (req, res, next) => {
  try {
    const result = await getAllTaiexDataController()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
