const joi = require('joi')

const createCommentVali = (insertValues) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    subject: joi.string().required(),
    content: joi.string().required(),
  })

  return schema.validate(insertValues)
}

module.exports = {createCommentVali}
