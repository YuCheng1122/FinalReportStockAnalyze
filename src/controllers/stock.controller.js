const { stockModels } = require('../models/index2')
const { AppError } = require('../config/error_classes')


const getStockAllInfoController = async () => {
  try {
    const stockInfo = await stockModels.getStockAllInfo()
    return stockInfo
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createComment', 3)
    }
  }
}

const getPePbController = async (stock_id) => {
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

module.exports = {getPePbController,getStockAllInfoController}
