const db = require('../config/databaseConnect')
const { SqlError } = require('../config/error_classes')

const insertComment = (insertValues) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO comment(NAME,email,SUBJECT,content) VALUES (?)'
    db.query(sql, [insertValues], (error, result) => {
      if (error) {
        console.log(error);
        reject(new SqlError(error, 4))
      } else if (result.affectedRows === 0) {
        reject(SqlError(new Error('InsertComment success but no data inserted.'), 3))
      } else {
        resolve()
      }
    })
  })
}

module.exports = insertComment
