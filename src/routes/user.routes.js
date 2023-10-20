const router = require('express').Router()
const cotroll = require('../controllers')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('../config/passport')(passport)
const userValidation = require('../validations/user.validation')
const { RouteError } = require('../config/error_classes')

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
    const valid = userValidation.registerVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }
    await cotroll.userControll.createUser(req.body)
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
    const valid = userValidation.loginVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }
    let result = await cotroll.userControll.loginUser(req.body)
    response_data.success = true
    let token = jwt.sign({ user_id: result.user_id, email: result.email }, process.env.JWT_SECRET_KEY)
    response_data.data = result
    response_data.data.token = 'JWT ' + token
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
router.patch('/update/password', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = userValidation.updatePasswordVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    await cotroll.userControll.updatePassword(req.user.user_id, req.body)
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
router.get('/lightup/history', passport.authenticate('jwt', { session: false }), (req, res, next) => {})

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
router.get('/getGroup', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let result = await cotroll.userControll.getGroup(req.user.user_id)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

/**
 * 新增投資組合
 *
 * @route POST /api/user/createGroup
 * @param {object} - {
 *  stock_id_array: array
 *  group_name: string
 * }
 */
router.post('/createGroup', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = userValidation.createGroupVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    let { group_name, stock_id_array } = req.body
    await cotroll.userControll.createGroup(req.user.user_id, group_name, stock_id_array)
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
router.delete('/deleteGroup', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = userValidation.deleteGroupVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    await cotroll.userControll.deleteGroup(req.user.user_id, req.body.group_name)
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
router.patch('/updateGroup', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = userValidation.updateGroupVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    let old_group_name = req.body.old_group_name
    let new_group_name = req.body.new_group_name
    let stock_id_array = req.body.stock_id_array
    await cotroll.userControll.updateGroup(req.user.user_id, old_group_name, new_group_name, stock_id_array)
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
router.get('/all/industry/stock', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
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
router.patch('/set/default/combo', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = userValidation.setDefaultComboVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }

    await cotroll.userControll.setDefaultCombo(req.user.user_id, req.body.group_name)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

module.exports = router
