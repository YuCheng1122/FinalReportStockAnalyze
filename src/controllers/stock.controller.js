const { getStockInfo } = require('../models/stock.models')
const { AppError } = require('../config/error_classes')

const getStockInfoController = async (req, res, next) => {
  try {
    const stock_id = req.params.stock_id
    const stockInfo = await getStockInfo(stock_id)
    res.json(stockInfo)
  } catch (error) {
    next(error)
  }
}
module.exports = {getStockInfoController}
