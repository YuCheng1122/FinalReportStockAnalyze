const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = (insertValues) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO googlenewsarticles(title, time, link, imageSrc) VALUES ?'
    db.query(sql, [insertValues], (error, result) => {
      if (error) {
        reject(new AppError(error, 'ModelError', 'insertData', 4))
      } else {
        resolve()
      }
    })
  })
}

module.exports = { insertData }
