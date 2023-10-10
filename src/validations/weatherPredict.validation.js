const joi = require('joi')

const predictFmtqikVali = (insertValues) => {
  const schema = joi.object({
    type: joi.string().valid('suuny', 'rainny', 'cloudy').required(),
    timestamp: joi.string().valid('one','three','week').required()
  })
  return schema.validate(insertValues)
}

const linearRegressiuonVali = (insertValues) => {
  const schema = joi.object({
    independent: joi.string().valid().required('status', 'temperature', 'humidity', 'precipitation'),
    dependent: joi.string().valid('fmtqik').required(),
  })
  return schema.validate(insertValues)
}

const automicRegressionVali = (insertValues) => {
  const schema = joi.object({
    independent: joi.string().valid().required('status', 'temperature', 'humidity', 'precipitation'),
    dependent: joi.string().valid('fmtqik').required(),
  })
  return schema.validate(insertValues)
}

const ccVali = (insertValues) => {
  const schema = joi.object({
    independent: joi.string().valid().required('status', 'temperature', 'humidity', 'precipitation'),
    dependent: joi.string().valid('fmtqik').required(),
  })
  return schema.validate(insertValues)
}

module.exports = { predictFmtqikVali, linearRegressiuonVali, automicRegressionVali, ccVali }
