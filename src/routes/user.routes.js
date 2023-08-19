const router = require("express").Router();

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
router.post("/register", (req, res) => {});

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
router.post("/login", (req, res) => {});
