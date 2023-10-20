const router = require('express').Router()
const controll = require('../controllers/index')
const { createCommentVali } = require('../validations/user_response.validation')
const { RouteError } = require('../config/error_classes')

router.post('/create/comment', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const valid = createCommentVali(req.body)
    if (valid.error) {
      throw new RouteError(new Error(valid.error.details[0].message), 1)
    }
    await controll.userResponseController(req.body)
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    error.response_data = response_data
    next(error)
  }
})

module.exports = router
