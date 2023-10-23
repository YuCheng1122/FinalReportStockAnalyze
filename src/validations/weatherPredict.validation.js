const joi = require('joi')

const predictVali = (insertValues) => {
  const schema = joi.object({
    type: joi.string().valid('sunny', 'cloudy', 'rainny', 'temperature', 'humidity', 'precipitation').required(),
    stock_id: joi.number().required(),
  })
  return schema.validate(insertValues)
}

const predictLighUpVali = (insertValues) => {
  const schema = joi.object({
    type: joi.string().valid('sunny', 'cloudy', 'rainny').required(),
    stock_id: joi.number().required(),
  })
  return schema.validate(insertValues)
}

module.exports = { predictLighUpVali, predictVali }
