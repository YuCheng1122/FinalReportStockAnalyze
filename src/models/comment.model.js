const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertComment = async (insertValues) => {
  return new Promise((resole, reject) => {
    let sql = 'INSERT INTO comment SET ?'
    db.query(sql, [insertValues], (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'insertComment', 4))
      } else if (result.affectedRows === 0) {
        reject(new AppError(new Error('InsertComment function not insert successfully.'), 'Model', 'insertComment', 3))
      } else {
        resole()
      }
    })
  })
}

module.exports = { insertComment }
