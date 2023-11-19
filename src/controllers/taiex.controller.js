const taiexDataModel = require('../models/taiex.model')
const { AppError } = require('../config/error_classes')

const getTaiexDataByDateController = async (date) => {
  try {
    const result = await taiexDataModel.getTaiexDataByDate(date)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getTaiexDataByDateController', 3)
    }
  }
}

const getAllTaiexDataController = async () => {
  try {
    const result = await taiexDataModel.getAllTaiexData()
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getAllTaiexDataController', 3)
    }
  }
}

module.exports = { getTaiexDataByDateController, getAllTaiexDataController }
