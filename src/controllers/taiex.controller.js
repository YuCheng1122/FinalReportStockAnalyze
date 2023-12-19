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
  /**
   * Retrieves all the Taiex data from the taiexDataModel.
   *
   * @returns {Promise<any>} The result of retrieving all the Taiex data.
   * @throws {SqlError} If an error occurs during retrieval.
   * @throws {AppError} If an error occurs that is not a SqlError.
   */
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

