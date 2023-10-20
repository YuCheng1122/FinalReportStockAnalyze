const models = require('../models/index2')
const bcrypt = require('bcrypt')
const { ControllerError, SqlError } = require('../config/error_classes')

const createUser = (insertValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, email, password } = insertValues
      let hashPassword = await bcrypt.hash(password, 10)
      await models.userModels.insertUser({ name, email, password: hashPassword })
      resolve()
    } catch (error) {
      if (error instanceof SqlError) {
        reject(error)
      } else {
        reject(new ControllerError(error))
      }
    }
  })
}

const loginUser = (insertValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { email, password } = insertValues
      let userData = await models.userModels.selectUser(email)
      if (userData.length === 0) {
        throw new ControllerError(new Error('Email is not correct.'), 2)
      }
      let valid = await bcrypt.compare(password, userData[0].password)
      if (!valid) {
        throw new ControllerError(new Error('Password is not correct.'), 2)
      }
      resolve({ user_id: userData[0].user_id, email: userData[0].email })
    } catch (error) {
      reject(error.name === 'SqlError' || error.name === 'ControllerError' ? error : new ControllerError(error, 3))
    }
  })
}

const updatePassword = (user_id, insertValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { password } = insertValues
      let hashPassword = await bcrypt.hash(password, 10)
      await models.userModels.updatePassword(user_id, hashPassword)
      resolve()
    } catch (error) {
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
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
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
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
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

const deleteGroup = (user_id, group_name) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.userModels.deleteGroup(user_id, group_name)
      resolve()
    } catch (error) {
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
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
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
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
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
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
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

const getHistory = (user_id) => {
  return new Promise(async(resolve,reject) => {
    try{
      const results = await models.userModels.getUserHistory(user_id)
      resolve(results)
    }catch(error){
      reject(error.name === 'SqlError' ? error : new ControllerError(error, 3))
    }
  })
}

module.exports = { createUser, loginUser, updatePassword, createGroup, getGroup, deleteGroup, updateGroup, getAllIndustryStock, setDefaultCombo, getHistory }
