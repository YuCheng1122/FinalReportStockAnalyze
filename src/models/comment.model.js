const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertComment = async (insertValues) => {
  return new Promise((resole, reject) => {
    const { name, email, subject, content } = insertValues
    let sql = 'INSERT INTO comment(name, email, subject, content) VALUES (?, ?, ?, ?) RETURNING comment_id'
    db.query(sql, [name, email, subject, content], (error, result) => {
      if (error) {
        reject(new AppError(error, 'Model', 'insertComment', 4))
      } else if (result.length === 0) {
        reject(new AppError(new Error('InsertComment function not insert successfully.'), 'Model', 'insertComment', 3))
      } else {
        resole()
      }
    })
  })
}

module.exports = { insertComment }
