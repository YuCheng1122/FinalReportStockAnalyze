const router = require('express').Router()

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
router.post('/register', (req, res) => {})

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
 *  token: string
 * }
 */
router.post('/login', (req, res) => {})

/**
 * 修改密碼
 *
 * @route POST /api/user/update/password
 * @param {object} - {
 *  password: string
 * }
 */
router.post('/update/password', (req, res) => {})

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
