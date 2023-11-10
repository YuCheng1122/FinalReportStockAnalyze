const { stockModels } = require('../models/index2')
const { AppError } = require('../config/error_classes')

const getStockInfoController = async (stock_id) => {
  try {
    const stockInfo = await stockModels.getStockPePb(stock_id)
    return stockInfo
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createComment', 3)
    }
  }
}
module.exports = {getStockInfoController}
