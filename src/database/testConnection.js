const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const { Sequelize } = require('sequelize')
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env
console.log(DB_NAME, DB_USERNAME, DB_PASSWORD)

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST || 'localhost',
  port: DB_PORT || 5432,
  dialect: 'postgres',
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })
