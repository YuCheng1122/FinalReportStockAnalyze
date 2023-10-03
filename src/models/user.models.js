const mysql = require('mysql2')
const { SqlError } = require('../../error_classes')

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

const insertUser = async (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO user SET ?'
    db.query(sql, insertValues, (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve()
      }
    })
  })
}

const selectUser = async (email) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT user_id, password, email FROM user WHERE email = ?'
    db.query(sql, email, (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve(result)
      }
    })
  })
}

const updatePassword = async (user_id, hashPassword) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE user SET PASSWORD = ? WHERE user_id = ?'
    db.query(sql, [hashPassword, user_id], (error, result) => {
      if (error) {
        reject(new SqlError(error))
      } else if (result.affectedRows === 0) {
        reject(new SqlError(new Error('No search user email'), 3))
      } else {
        resolve(result[0])
      }
    })
  })
}

const insertGroup = (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO preferStock(user_id,group_name,stock_id) VALUES ?'
    db.query(sql, [insertValues], (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve()
      }
    })
  })
}

const getGroup = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'WITH RankedStockData AS (SELECT sda.stock_id,sda.change,sda.opening_price,sda.closing_price,sda.highest_price,sda.lowest_price,ROW_NUMBER() OVER (PARTITION BY sda.stock_id ORDER BY sda.create_date DESC) AS RowNum FROM stock_day_all sda) SELECT s.stock_id,s.name,pf.group_name,rsd.change,rsd.opening_price,rsd.closing_price,rsd.highest_price,rsd.lowest_price FROM preferStock pf LEFT JOIN stock s ON pf.stock_id = s.stock_id LEFT JOIN RankedStockData rsd ON s.stock_id = rsd.stock_id AND rsd.RowNum = 1 WHERE pf.user_id = ? ORDER BY pf.group_name;'
    db.query(sql, [user_id], (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve(result)
      }
    })
  })
}

const deleteGroup = (user_id, group_name) => {
  return new Promise((resolve, reject) => {
    console.log(user_id, group_name)
    let sql = 'DELETE FROM preferStock WHERE user_id = ? AND group_name = ?'
    db.query(sql, [user_id, group_name], (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve()
      }
    })
  })
}

const getAllIndustryStock = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM stock ORDER BY industry'
    db.query(sql, (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve(result)
      }
    })
  })
}

const setDefault = (user_id, group_name) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE preferstock SET is_default = TRUE WHERE user_id = ? AND group_name = ?'
    db.query(sql, [user_id, group_name], (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve()
      }
    })
  })
}

const cleanDefault = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE preferstock SET is_default = false WHERE user_id = ?'
    db.query(sql, [user_id], (error, result) => {
      if (error) {
        reject(new SqlError(error, 4))
      } else {
        resolve()
      }
    })
  })
}

module.exports = { insertUser, selectUser, updatePassword, insertGroup, getGroup, deleteGroup, getAllIndustryStock, setDefault, cleanDefault }
