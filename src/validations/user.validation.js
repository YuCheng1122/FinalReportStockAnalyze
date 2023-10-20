const joi = require('joi')

const registerVali = (insertValues) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  return schema.validate(insertValues)
}

const loginVali = (insertValues) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  return schema.validate(insertValues)
}

const updatePasswordVali = (insertValues) => {
  const schema = joi.object({
    password: joi.string().required(),
  })
  return schema.validate(insertValues)
}

const createGroupVali = (insertValues) => {
  const schema = joi.object({
    stock_id_array: joi.array().items().min(1).required(),
    group_name: joi.string().required(),
  })
  return schema.validate(insertValues)
}

const deleteGroupVali = (insertValues) => {
  const schema = joi.object({
    group_name: joi.string().required(),
  })
  return schema.validate(insertValues)
}

const updateGroupVali = (insertValues) => {
  const schema = joi.object({
    old_group_name: joi.string().required(),
    new_group_name: joi.string().required(),
    stock_id_array: joi.array().items().min(1).required(),
  })
  return schema.validate(insertValues)
}

const setDefaultComboVali = (insertValues) => {
  const schema = joi.object({
    group_name: joi.string().required(),
  })
  return schema.validate(insertValues)
}

const getHistoryVali = (insertValues) => {
  const schema = joi.object({
    user_id: joi.number().required(),
  })
  return schema.validate(insertValues)
}

module.exports = { registerVali, loginVali, updatePasswordVali, createGroupVali, deleteGroupVali, updateGroupVali, setDefaultComboVali, getHistoryVali }
