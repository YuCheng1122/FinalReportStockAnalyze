const express = require('express')
const { stockController } = require('../controllers/index')
const router = express.Router()

// 獲取股票資訊
router.get('/:stock_id', async (req,res,next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let stock_id = req.params.stock_id
    console.log(stock_id);
    const result = await stockController.getStockInfoController(stock_id)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
