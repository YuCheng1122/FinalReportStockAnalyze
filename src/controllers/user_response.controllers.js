const models = require('../models/index2')
const { AppError } = require('../config/error_classes')

const createComment = async (insertValues) => {
  try {
    await models.commentModels.insertComment(insertValues)
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createComment', 3)
    }
  }
}

module.exports = {createComment}
