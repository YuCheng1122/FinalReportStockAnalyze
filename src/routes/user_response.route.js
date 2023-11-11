const router = require('express').Router()
const controll = require('../controllers/index')
const { createCommentVali } = require('../validations/user_response.validation')
const { AppError } = require('../config/error_classes')

/**
 * 新增使用者回饋
 * 
 * @route api/user/response
 * @param {object} -{
 *  name: string,
 *  email: string,
 *  subject: string,
 *  content: string 
 * }
 */
router.post('/create/comment', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = createCommentVali(req.body)
    if (valid.error) {
      throw new AppError(new Error(valid.error.details[0].message), 'RouteError', '/create/comment', 2)
    }
    await controll.userResponseController.createComment(req.body)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
