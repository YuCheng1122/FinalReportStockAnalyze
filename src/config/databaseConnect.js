const mysql = require('mysql2')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env
const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

module.exports = db
