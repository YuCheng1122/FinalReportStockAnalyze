const express = require('express')
const passport = require('passport')

require('./src/config/passport')(passport)
const routes = require('./src/routes')
const { AppError } = require('./src/config/error_classes')
const { handleError, handleInfo } = require('./src/config/log_creator')
const newsRoutes = require('./src/routes/news.routes')
const stockRoutes = require('./src/routes/stockInfo.routes')
require('dotenv').config()

const app = express()

const prelogMiddleware = (req, res, next) => {
  try {
    handleInfo({
      tag: req.client.parser.incoming.baseUrl.split('/')[2],
      message: `Received a ${req.method} request for ${req.url}`,
      body: req.body,
    })
    next()
  } catch (error) {
    handleError(new AppError(error, 'Middleware', 'prelogMiddleware', 4))
  }
}

/**
 * Error handler
 *
 * 4 : SQL error,
 * 3 : SQL logical error & Controller error,
 * 2 : Controller parameter error
 * 1 : Route parameter error
 *
 */
const errorlogMiddleware = (error, req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    if (error.errorLevel === 3 || error.errorLevel === 4) {
      response_data.errorMessage = 'An error occured, Please contact relevant technoligists for assistance.'
    } else {
      response_data.errorMessage = error.message
    }
    handleError(error)
  } catch (error) {
    handleError(new AppError(error, 'Middleware', 'errorlogMiddleware', 4))
  }
  return res.status(200).send(response_data)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', prelogMiddleware, routes.userRoutes, errorlogMiddleware)
app.use('/api/user/response', prelogMiddleware, routes.userResponseRoutes, errorlogMiddleware)
app.use('/api/weather', prelogMiddleware, passport.authenticate('jwt', { session: false }), routes.weatherRedictRoutes, errorlogMiddleware)
app.use('/api/news', prelogMiddleware, newsRoutes, errorlogMiddleware)
app.use('/api/stock',prelogMiddleware,stockRoutes,errorlogMiddleware)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

module.exports = {app,server}
