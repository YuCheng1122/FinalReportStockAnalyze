const router = require('express').Router()

/**
 * 註冊會員
 *
 * @route POST /user/register
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
 * @route POST /user/login
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
 * @route POST /user/update/password
 * @param {object} - {
 *  password: string
 * }
 */
router.post('/update/password', (req, res) => {})

/**
 * 獲取點燈記錄
 *
 * @route GET /user/lightup/history
 * @return {object} - {
 *  create_date: string,
 *  data: {
 *    stock_name: string
 *  }[]
 * }[]
 */
router.get('/lightup/history', (req, res) => {})

// 自選股相關API

module.exports = router
