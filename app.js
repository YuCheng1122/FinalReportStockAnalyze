const express = require('express')
const passport = require('passport')
require('./src/config/passport')(passport)
const routes = require('./src/routes')
const { RouteError, ControllerError, SqlError } = require('./error_classes')
const { handleError, handleInfo } = require('./log_creator')
require('dotenv').config()

const app = express()
const PORT = 8080
const prelogMiddleware = (req, res, next) => {
  handleInfo({
    tag: req.client.parser.incoming.baseUrl.split('/')[2],
    message: `Received a ${req.method} request for ${req.url}`,
    body: req.body,
  })
  next()
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
  let response_data = error.response_data
  if (error instanceof SqlError) {
    response_data.errorMessage = 'An error occured, Please contact relevant technoligists for assistance.'
  } else if (error instanceof ControllerError) {
    response_data.errorMessage = error.status === 3 ? 'An error occured, Please contact relevant technoligists for assistance.' : error.message
  } else {
    response_data.errorMessage = error.message
  }
  handleError(error, req.client.parser.incoming.baseUrl.split('/')[2])
  return res.status(200).send(response_data)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', prelogMiddleware, passport.authenticate('jwt', { session: false }), routes.userRoutes, errorlogMiddleware)
app.use('/api/weather', prelogMiddleware, passport.authenticate('jwt', { session: false }), routes.weatherRedictRoutes, errorlogMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
