const models = require('../models/index2')
const bcrypt = require('bcrypt')
const { AppError } = require('../config/error_classes')

const createUser = async (insertValues) => {
  try {
    let { name, email, password } = insertValues
    let hashPassword = await bcrypt.hash(password, 10)
    await models.userModels.insertUser({ name, email, password: hashPassword })
    return
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createUser', 3)
    }
  }
}

const loginUser = async (insertValues) => {
  try {
    let { email, password } = insertValues
    let userData = await models.userModels.selectUser(email)
    if (userData.length === 0) {
      throw new AppError(new Error('Email is not correct.'), 'ControllerError', 'createUser', 1)
    }
    let valid = await bcrypt.compare(password, userData[0].password)
    if (!valid) {
      throw new AppError(new Error('Password is not correct.'), 'ControllerError', 'createUser', 1)
    }
    return { user_id: userData[0].user_id, name: userData[0].name, email: userData[0].email }
  } catch (error) {
    if (error.source === 'SqlError' || error.source === 'ControllerError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'loginUser', 3)
    }
  }
}

const updatePassword = async (user_id, insertValues) => {
  try {
    let { password } = insertValues
    let hashPassword = await bcrypt.hash(password, 10)
    await models.userModels.updatePassword(user_id, hashPassword)
    return
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'updatePassword', 3)
    }
  }
}

const createGroup = async (user_id, group_name, stock_id_array) => {
  try {
    let insertValues = stock_id_array.map((stock_id) => {
      return [user_id, group_name, stock_id]
    })
    await models.userModels.insertGroup(insertValues)
    return
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createGroup', 3)
    }
  }
}

const getGroup = async (user_id) => {
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

    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getGroup', 3)
    }
  }
}

const deleteGroup = async (user_id, group_name) => {
  try {
    await models.userModels.deleteGroup(user_id, group_name)
    return
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'deleteGroup', 3)
    }
  }
}

const updateGroup = async (user_id, old_group_name, new_group_name, stock_id_array) => {
  try {
    await models.userModels.deleteGroup(user_id, old_group_name)
    let insertValues = stock_id_array.map((stock_id) => {
      return [user_id, new_group_name, stock_id]
    })
    await models.userModels.insertGroup(insertValues)
    return
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'updateGroup', 3)
    }
  }
}

const getAllIndustryStock = async () => {
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
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getAllIndustryStock', 3)
    }
  }
}

const setDefaultCombo = async (user_id, group_name) => {
  try {
    await models.userModels.cleanDefault(user_id)
    await models.userModels.setDefault(user_id, group_name)
    return
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'setDefaultCombo', 3)
    }
  }
}

const getHistory = async (user_id) => {
  try {
    const results = await models.userModels.getUserHistory(user_id)
    return results
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getHistory', 3)
    }
  }
}

const getAllCards = async (user_id) => {
  try{
    const results = await models.cardModels.getData(user_id)
    return results
  }catch(error){
    throw error
  }
}

const createCards = async (insertValues) => {
  try{
    await models.cardModels.insertData(insertValues)
    return 
  }catch(error){
    throw error    
  }
}

module.exports = { createUser, loginUser, updatePassword, createGroup, getGroup, deleteGroup, updateGroup, getAllIndustryStock, setDefaultCombo, getHistory, getAllCards, createCards}
