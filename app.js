const express = require('express')
const passport = require('passport')
const cors = require('cors')
require('./src/config/passport')(passport)
const routes = require('./src/routes')
const { AppError } = require('./src/config/error_classes')
const { handleError, handleInfo } = require('./src/config/log_creator')
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
app.use(cors())
app.use('/api/user', prelogMiddleware, routes.userRoutes, errorlogMiddleware)
app.use('/api/user/response', prelogMiddleware, routes.userResponseRoutes, errorlogMiddleware)
app.use('/api/weather', prelogMiddleware, routes.weatherRedictRoutes, errorlogMiddleware)
app.use('/api/news', prelogMiddleware, routes.newsRoutes, errorlogMiddleware)
app.use('/api/stock', prelogMiddleware, routes.stockInfoRoutes, errorlogMiddleware)
app.use('/api/taiex', prelogMiddleware, routes.taiwanIndexRoutes, errorlogMiddleware)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 8080
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

module.exports = { app }
