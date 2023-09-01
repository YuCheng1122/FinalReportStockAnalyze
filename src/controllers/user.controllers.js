const models = require('../models/index2')
const bcrypt = require('bcrypt')

const createUser = async (insertValues) => {
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

const loginUser = async (insertValues) => {
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

module.exports = { createUser, loginUser }