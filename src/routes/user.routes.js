const router = require('express').Router()
const cotroll = require('../controllers')

/**
 * 註冊會員
 *
 * @route POST /api/user/register
 * @param {object} - {
 *  name: string,
 *  email: string,
 *  password: string
 * }
 */
router.post('/register', async (req, res) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let insertValues = req.body
    await cotroll.userControll.createUser(insertValues)
    response_data.success = true
  } catch (error) {
    console.log(error.message)
    response_data.errorMessage = 'CreateUser function have some error'
  }
  res.status(200).send(response_data)
})

/**
 * 登入會員
 *
 * @route POST /api/user/login
 * @param {object} - {
 *  email: string,
 *  password: string
 * }
 * @returns {object} - {
 *  user_id: number,
 *  email: string,
 *  token: string
 * }
 */
router.post('/login', async (req, res) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let insertValues = req.body
    let result = await cotroll.userControll.loginUser(insertValues)
    response_data.success = true
    response_data.data = result
  } catch (error) {
    console.log(error.message)
    response_data.errorMessage = error.message
  }
  res.status(200).send(response_data)
})

/**
 * 修改密碼
 *
 * @route POST /api/user/update/password
 * @param {object} - {
 *  password: string
 * }
 */
router.patch('/update/password', async (req, res) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let insertValues = req.body
    let user_id = 2
    await cotroll.userControll.updatePassword(user_id, insertValues)
    response_data.success = true
  } catch (error) {
    console.log(error.message)
    response_data.errorMessage = error.message
  }
  res.status(200).send(response_data)
})

/**
 * 獲取點燈記錄
 *
 * @route GET /api/user/lightup/history
 * @return {object} - {
 *  create_date: string,
 *  data: {
 *    stock_name: string
 *  }[]
 * }[]
 */
router.get('/lightup/history', (req, res) => {})

/**
 * 獲取目前用戶的投資組合
 *
 * @route GET /api/user/getTeam
 * @return {object} - {
 *  team_name: string,
 *  data: {
 *    stock_name: string,
 *    stock_id: string,
 *    price: number,
 *    quote_change: number,
 *    quote_change_percent: number,
 *    opening_price: number,
 *    closing_price: number,
 *    highest_price: number,
 *    lowest_price: number
 *  }[]
 * }[]
 */
router.get('/getTeam', (req, res) => {})

/**
 * 新增投資組合
 *
 * @route POST /api/user/createTeam
 * @param {object} - {
 *  team_name: string
 * }
 */
router.post('/createTeam', (req, res) => {})

/**
 * 刪除投資組合(hard delete)
 *
 * @route DELETE /api/user/deleteTeam/team_id
 * @param {string} - team_id
 */
router.delete('/deleteTeam/:team_id', (req, res) => {})

/**
 * 更改投資組合名稱
 *
 * @route PATCH /api/user/updateTeam/team_id
 * @param {string} - team_id
 */
router.patch('/updateTeam/:team_id', (req, res) => {})

/**
 * 新增股票到投資組合裡
 *
 * @route POST /api/user/insertStock
 * @param {object} - {
 *  team_id: number,
 *  stock_id_array: {
 *    stock_id: number
 *  }[]
 * }
 */
router.post('/insertStock', (req, res) => {})

/**
 * 刪除投資組合內的股票(hard delete)
 *
 * @route DELETE /api/user/deleteStock
 * @param {object} - {
 *  team_id: number,
 *  stock_id_array: {
 *    stock_id: number
 *  }[]
 * }
 */
router.delete('/deleteStock', (req, res) => {})

module.exports = router
