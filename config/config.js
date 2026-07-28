const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
})

const sslDialectOptions = process.env.PGSSLMODE === 'disable' ? {} : { ssl: { require: true, rejectUnauthorized: false } }

const base = process.env.DATABASE_URL
  ? {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres',
      dialectOptions: sslDialectOptions,
    }
  : {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      dialectOptions: sslDialectOptions,
    }

module.exports = {
  development: base,
  test: base,
  production: base,
}
