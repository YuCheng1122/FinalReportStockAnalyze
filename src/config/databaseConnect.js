const { Pool } = require('pg')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
      }
)

// Converts `backtick` identifiers (MySQL) to "double quoted" identifiers (Postgres).
const toPgIdentifiers = (sql) => sql.replace(/`([^`]+)`/g, '"$1"')

// mysql2 lets you write `INSERT IGNORE INTO ...` to silently skip rows that violate a
// unique constraint. Postgres has no such keyword; the closest equivalent is
// `ON CONFLICT DO NOTHING`, appended after the VALUES clause is built.
const isInsertIgnore = (sql) => /^\s*INSERT\s+IGNORE\s+INTO/i.test(sql)
const stripInsertIgnore = (sql) => sql.replace(/^(\s*)INSERT\s+IGNORE\s+INTO/i, '$1INSERT INTO')

// mysql2 special-cases a single `?` (or `(?)`) right after VALUES: pass an array of rows
// (bulk insert) or a flat array of one row's values, and it expands the placeholder into
// the literal tuples. Postgres has no such shorthand, so we expand it ourselves into a
// real multi-row VALUES list with numbered placeholders.
const BULK_VALUES_RE = /VALUES\s*\(?\s*\?\s*\)?\s*;?\s*$/i

const expandBulkValues = (sql, params) => {
  let rows = params[0]
  if (!Array.isArray(rows)) return null
  if (rows.length === 0) return { empty: true }
  if (!Array.isArray(rows[0])) rows = [rows] // single flat row -> one-row bulk insert

  const flatParams = []
  const valueGroups = rows.map((row) => {
    const placeholders = row.map((value) => {
      flatParams.push(value)
      return `$${flatParams.length}`
    })
    return `(${placeholders.join(', ')})`
  })

  const newSql = sql.replace(BULK_VALUES_RE, `VALUES ${valueGroups.join(', ')}`)
  return { sql: newSql, params: flatParams }
}

// mysql2 also lets you write `INSERT INTO table SET ?` and pass a plain object - each key
// becomes a column. Postgres has no equivalent, so expand it into an explicit column list.
const SET_OBJECT_RE = /^\s*INSERT\s+INTO\s+([\w."`]+)\s+SET\s*\?\s*;?\s*$/i

const expandSetObject = (sql, params) => {
  const match = sql.match(SET_OBJECT_RE)
  if (!match) return null
  const obj = params[0]
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return null

  const keys = Object.keys(obj)
  const values = keys.map((key) => obj[key])
  const placeholders = keys.map((_, i) => `$${i + 1}`)
  const newSql = `INSERT INTO ${match[1]}(${keys.join(', ')}) VALUES (${placeholders.join(', ')})`
  return { sql: newSql, params: values }
}

// Converts positional `?` placeholders (MySQL) to numbered `$1, $2, ...` (Postgres).
const toPositionalParams = (sql) => {
  let i = 0
  return sql.replace(/\?/g, () => `$${++i}`)
}

const normalizeParams = (paramsOrCallback) => {
  if (paramsOrCallback === undefined) return []
  return Array.isArray(paramsOrCallback) ? paramsOrCallback : [paramsOrCallback]
}

// Drop-in replacement for mysql2 pool.query(sql, params, callback) / pool.query(sql, callback).
// Returns rows directly as `result` in the callback, matching mysql2's behavior for SELECTs
// (which is how nearly every model in this codebase already treats the result).
const query = (sql, paramsOrCallback, maybeCallback) => {
  let params
  let callback
  if (typeof paramsOrCallback === 'function') {
    params = []
    callback = paramsOrCallback
  } else {
    params = normalizeParams(paramsOrCallback)
    callback = maybeCallback
  }

  let pgSql = toPgIdentifiers(sql)
  const wasInsertIgnore = isInsertIgnore(pgSql)
  if (wasInsertIgnore) pgSql = stripInsertIgnore(pgSql)

  let pgParams = params
  const setObjectExpanded = expandSetObject(pgSql, params)
  if (setObjectExpanded) {
    pgSql = setObjectExpanded.sql
    pgParams = setObjectExpanded.params
  } else if (BULK_VALUES_RE.test(pgSql.trim())) {
    const expanded = expandBulkValues(pgSql, params)
    if (expanded.empty) return callback(null, [])
    pgSql = expanded.sql
    pgParams = expanded.params
  } else {
    pgSql = toPositionalParams(pgSql)
  }

  if (wasInsertIgnore) pgSql = `${pgSql.replace(/;?\s*$/, '')} ON CONFLICT DO NOTHING`

  pool.query(pgSql, pgParams, (error, result) => {
    if (error) return callback(error)
    callback(null, result.rows)
  })
}

module.exports = { query, pool }
