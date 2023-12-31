const winston = require('winston')
const { transports } = winston
const { combine, timestamp, colorize, printf } = winston.format
const { insertInfo, insertError } = require('../models/log.model')

const consoleFormatter = printf((Info) => {
  return `[${Info.timestamp}] [${Info.level}] [${Info.message}]`
})

const logPrintf = printf((Info) => {
  let information
  if (Info.level === 'error') {
    if (Info.stack) {
      information = `[${Info.level}] [TimeStamp: ${Info.timestamp}] [ErrorSource: ${Info.source}] [errorLocation: ${Info.errorLocation}] [Message: ${Info.message}]\n${Info.stack}\n\n`
    } else {
      information = `[${Info.level}] [TimeStamp: ${Info.timestamp}] [ErrorSource: ${Info.source}] [errorLocation: ${Info.errorLocation}] [Message: ${Info.message}]`
    }
  } else {
    let body = Info.body ? JSON.stringify(Info.body) : {}
    information = `[${Info.level}] [TimeStamp: ${Info.timestamp}] [TAG: ${Info.tag}] [Message: ${Info.message}]\n  'Body: ' ${body} }`
  }
  return information
})

const combinedLogger = winston.createLogger({
  level: 'info',
  transports: [new transports.File({ filename: './files/logs/combine.log', level: 'info', format: combine(timestamp(), logPrintf) })],
})

const errorLogger = winston.createLogger({
  level: 'error',
  transports: [new transports.File({ filename: './files/logs/error.log', level: 'error', format: combine(timestamp(), logPrintf) })],
})

if (process.env.NODE_ENV === 'development') {
  combinedLogger.add(new transports.Console({ format: combine(colorize({ all: true }), timestamp(), consoleFormatter) }))
}

combinedLogger.on('data', async (Info) => {
  try {
    if (Info.level === 'info') {
      let body = Info.body ? JSON.stringify(Info.body) : null
      let values = [Info.message, Info.level, body]
      await insertInfo(values)
    }
  } catch (error) {
    console.log(error)
  }
})

errorLogger.on('data', async (Info) => {
  try {
    const insertValues = [Info.source, Info.errorLocation, Info.stack, Info.message, Info.level]
    await insertError(insertValues)
  } catch (error) {
    console.log(error)
  }
})

handleError = (err) => {
  combinedLogger.error({ message: err.message, source: err.source, errorLocation: err.errorLocation })
  errorLogger.error({ message: err.message, source: err.source, errorLocation: err.errorLocation, stack: err.stack })
}

handleInfo = (info) => {
  combinedLogger.info({ tag: info.tag, message: info.message, body: info.body })
}

module.exports = { handleInfo, handleError }
