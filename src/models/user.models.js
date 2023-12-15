const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertUser = (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO user SET ?'
    db.query(sql, insertValues, (error, result) => {
      if (error) {
        console.log(error)
        reject(new AppError(error, 'SqlError', 'insertUser', 4))
      } else {
        console.log(result)
        resolve(result.insertId)
      }
    })
  })
}

const selectUser = (email) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT user_id,name, password, email FROM user WHERE email = ?'
    db.query(sql, email, (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'selectUser', 4))
      } else {
        resolve(result)
      }
    })
  })
}

const deleteUser = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'DELETE FROM user WHERE user_id = ?'
    db.query(sql, user_id, (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'selectUser', 4))
      } else {
        resolve(result)
      }
    })
  })
}

const selectUserwithJWT = (user_id, email) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM user WHERE user_id = ? AND email = ?'
    db.query(sql, [user_id, email], (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'selectUserwithJWT', 4))
      } else if (result.length === 0) {
        reject(new AppError(new Error('Not correct jwt'), 'SqlError', 'selectUserwithJWT', 3))
      } else {
        resolve(true)
      }
    })
  })
}

const updatePassword = (user_id, hashPassword) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE user SET PASSWORD = ? WHERE user_id = ?'
    db.query(sql, [hashPassword, user_id], (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'updatePassword', 4))
      } else if (result.affectedRows === 0) {
        reject(new AppError(new Error('Not search data'), 'SqlError', 'updatePassword', 4))
      } else {
        resolve(result[0])
      }
    })
  })
}

const insertGroup = (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO preferstock(user_id,group_name,stock_id) VALUES ?'
    db.query(sql, [insertValues], (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'insertGroup', 4))
      } else {
        resolve()
      }
    })
  })
}

const getGroup = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'WITH RankedStockData AS (SELECT sda.stock_id,sda.change,sda.opening_price,sda.closing_price,sda.highest_price,sda.lowest_price,ROW_NUMBER() OVER (PARTITION BY sda.stock_id ORDER BY sda.create_date DESC) AS RowNum FROM stock_day_all sda) SELECT s.stock_id,s.name,pf.group_name,rsd.change,rsd.opening_price,rsd.closing_price,rsd.highest_price,rsd.lowest_price FROM preferstock pf LEFT JOIN stock s ON pf.stock_id = s.stock_id LEFT JOIN RankedStockData rsd ON s.stock_id = rsd.stock_id AND rsd.RowNum = 1 WHERE pf.user_id = ? ORDER BY pf.group_name;'
    db.query(sql, [user_id], (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getGroup', 4))
      } else {
        resolve(result)
      }
    })
  })
}

const deleteGroup = (user_id, group_name) => {
  return new Promise((resolve, reject) => {
    let sql = 'DELETE FROM preferstock WHERE user_id = ? AND group_name = ?'
    db.query(sql, [user_id, group_name], (error, result) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'deleteGroup', 4))
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
        reject(new AppError(error, 'SqlError', 'getAllIndustryStock', 4))
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
        reject(new AppError(error, 'SqlError', 'setDefault', 4))
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
        reject(new AppError(error, 'SqlError', 'cleanDefault', 4))
      } else {
        resolve()
      }
    })
  })
}

const getUserHistory = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT s.stock_id , s.name, h.create_date FROM history h JOIN stock s ON h.stock_id = s.stock_id WHERE h.user_id = ?;'
    db.query(sql, [user_id], (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getUserHistory', 4))
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { insertUser, selectUser, updatePassword, insertGroup, getGroup, deleteGroup, getAllIndustryStock, setDefault, cleanDefault, selectUserwithJWT, getUserHistory, deleteUser }
