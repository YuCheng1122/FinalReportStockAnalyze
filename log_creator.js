const winston = require('winston')
const { transports } = winston
const { combine, timestamp, simple, colorize, printf, ms } = winston.format

winston.addColors({
  error: 'bold red',
  warn: 'bold yellow',
  info: 'bold green',
})

const myPrintf = printf((Info) => {
  if (Info.level === 'error') {
    if (Info.stack) {
      return `${Info.level}  TAG: ${Info.tag}  ErrorName: ${Info.name}  TimeStamp: ${Info.timestamp}  RunTime: ${Info.ms}  Message: ${Info.message}\n${Info.stack}\n\n`
    } else {
      return `${Info.level}  TAG: ${Info.tag}  ErrorName: ${Info.name}  TimeStamp: ${Info.timestamp}  RunTime: ${Info.ms}  Message: ${Info.message}`
    }
  } else {
    return `${Info.level}  TimeStamp: ${Info.timestamp}  RunTime: ${Info.ms}  Message: ${Info.message}\nBody: ${Info.body ? JSON.stringify(Info.body) : ''}`
  }
})

const combinedLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), ms(), simple(), myPrintf),
  transports: [new transports.File({ filename: 'files/logs/combined.log', level: 'info' }), new transports.Console({ format: combine(colorize({ all: true }), simple(), myPrintf) })],
})

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(timestamp(), ms(), simple(), myPrintf),
  transports: [new transports.File({ filename: 'files/logs/error.log', level: 'error' })],
})

const handleError = (err, tag) => {
  errorLogger.log({ level: 'error', message: err.message, stack: err.stack, name: err.name, tag })
  combinedLogger.log({ level: 'error', name: err.name, message: err.message, tag })
}

const handleInfo = (info) => {
  combinedLogger.log({ level: 'info', tag: info.tag, message: info.message, body: info.body })
}

module.exports = { handleInfo, handleError }
