const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = (insertValues) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT IGNORE INTO googlenewsarticles(title, time, link, imageSrc, source_name, source_icon) VALUES ?'
    db.query(sql, [insertValues], (error, result) => {
      if (error) {
        console.log(error)
        reject(new AppError(error, 'ModelError', 'insertData', 4))
      } else {
        resolve()
      }
    })
  })
}

module.exports = { insertData }
