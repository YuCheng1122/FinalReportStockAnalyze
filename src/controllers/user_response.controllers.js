const models = require('../models/index2')
const { ControllerError } = require('../config/error_classes')

const createComment = (insertValues) => {
  return new Promise(async(resolve,reject) => {
    try{
      await models.userResponseModels(insertValues)
      resolve()
    }catch(error){
      error.name === 'SqlError' ? reject(error) : reject(new ControllerError(error,3))
    }
  })
}

module.exports = createComment
