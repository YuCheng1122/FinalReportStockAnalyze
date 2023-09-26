const models = require('../models/index2')
const bcrypt = require('bcrypt')

const createUser = (insertValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, email, password } = insertValues
      let hashPassword = await bcrypt.hash(password, 10)
      await models.userModels.insertUser({ name, email, password: hashPassword })
      resolve()
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const loginUser = (insertValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { email, password } = insertValues
      let userData = await models.userModels.selectUser(email)
      let valid = await bcrypt.compare(password, userData.password)
      if (!valid) {
        throw new Error('Password is not correct')
      }
      resolve({ user_id: userData.user_id, email: userData.email })
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const updatePassword = (user_id, insertValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { password } = insertValues
      let hashPassword = await bcrypt.hash(password, 10)
      console.log(user_id, hashPassword)
      await models.userModels.updatePassword(user_id, hashPassword)
      resolve()
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const createGroup = (user_id, group_name, stock_id_array) => {
  return new Promise(async (resolve, reject) => {
    try {
      let insertValues = stock_id_array.map((stock_id) => {
        return [user_id, group_name, stock_id]
      })
      await models.userModels.insertGroup(insertValues)
      resolve()
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const getGroup = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let datas = await models.userModels.getGroup(user_id)
      let result = []
      let current_group = null
      for (let data of datas) {
        if (data.group_name !== current_group) {
          current_group = data.group_name
          result.push({ group_name: current_group, data: [] })
        }
        result[result.length - 1].data.push(data)
      }

      resolve(result)
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const deleteGroup = (user_id, group_name) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.userModels.deleteGroup(user_id, group_name)
      resolve()
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const updateGroup = (user_id, old_group_name, new_group_name, stock_id_array) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.userModels.deleteGroup(user_id, old_group_name)
      let insertValues = stock_id_array.map((stock_id) => {
        return [user_id, new_group_name, stock_id]
      })
      await models.userModels.insertGroup(insertValues)
      resolve()
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const getAllIndustryStock = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let datas = await models.userModels.getAllIndustryStock()
      let result = []
      let current_industry = null
      for (let data of datas) {
        if (current_industry !== data.industry) {
          current_industry = data.industry
          result.push({ industry: current_industry, data: [] })
        }
        result[result.length - 1].data.push(data)
      }
      resolve(result)
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

const setDefaultCombo = (user_id, group_name) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.userModels.cleanDefault(user_id)
      await models.userModels.setDefault(user_id, group_name)
      resolve()
    } catch (error) {
      reject({ message: `Error: ${error.message}` })
    }
  })
}

module.exports = { createUser, loginUser, updatePassword, createGroup, getGroup, deleteGroup, updateGroup, getAllIndustryStock, setDefaultCombo }
