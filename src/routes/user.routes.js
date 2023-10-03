const router = require('express').Router()
const cotroll = require('../controllers')

const usermiddleware = (req, res, next) => {
  req.user_id = 3
  next()
}

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
router.post('/register', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let insertValues = req.body
    await cotroll.userControll.createUser(insertValues)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
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
router.post('/login', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let insertValues = req.body
    let result = await cotroll.userControll.loginUser(insertValues)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

/**
 * 修改密碼
 *
 * @route POST /api/user/update/password
 * @param {object} - {
 *  password: string
 * }
 */
router.patch('/update/password', usermiddleware, async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let insertValues = req.body
    let user_id = req.user_id
    await cotroll.userControll.updatePassword(user_id, insertValues)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
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
router.get('/lightup/history', (req, res,next) => {})

/**
 * 獲取目前用戶的投資組合
 *
 * @route GET /api/user/getGroup
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
router.get('/getGroup', usermiddleware, async (req, res,next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let user_id = req.user_id
    let result = await cotroll.userControll.getGroup(user_id)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
  
})

// 晚點補一個將已有的預設投資組合作設置與刪除
/**
 * 新增投資組合
 *
 * @route POST /api/user/createGroup
 * @param {object} - {
 *  stock_id_array: array
 *  team_name: string
 * }
 */
router.post('/createGroup', usermiddleware, async (req, res,next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let user_id = req.user_id
    let { group_name, stock_id_array } = req.body
    await cotroll.userControll.createGroup(user_id, group_name, stock_id_array)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
  
})

/**
 * 刪除投資組合(hard delete)
 *
 * @route DELETE /api/user/deleteGroup
 * @param {string} - group_name
 */
router.delete('/deleteGroup', usermiddleware, async (req, res,next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let group_name = req.body.group_name
    let user_id = req.user_id
    await cotroll.userControll.deleteGroup(user_id, group_name)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
  
})

/**
 * 更改投資組合名稱
 *
 * @route PATCH /api/user/updateGroup
 * @param {object} - {
 *  old_group_name: string,
 *  new_group_name: string,
 *  stock_id_array: array
 * }
 */
router.patch('/updateGroup', usermiddleware, async (req, res,next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let user_id = req.user_id
    let old_group_name = req.body.old_group_name
    let new_group_name = req.body.new_group_name
    let stock_id_array = req.body.stock_id_array
    await cotroll.userControll.updateGroup(user_id, old_group_name, new_group_name, stock_id_array)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
  
})

/**
 * 獲取所有產業別底下股票代號
 *
 * @route GET /api/user/all/industry/stock
 * @return {object} - {
 *  industry: string,
 *  data: {
 *    stock_id: number,
 *    name: string,
 *    industry: string
 *  }[]
 * }[]
 */
router.get('/all/industry/stock', usermiddleware, async (req, res,next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let result = await cotroll.userControll.getAllIndustryStock()
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

/**
 * 設置預設投資組合
 *
 * @route PATCH /api/user/set/default/combo
 * @param {object} - {
 *  group_name: string
 * }
 */
router.patch('/set/default/combo', usermiddleware, async (req, res,next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let user_id = req.user_id
    let group_name = req.body.group_name
    await cotroll.userControll.setDefaultCombo(user_id, group_name)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

module.exports = router
