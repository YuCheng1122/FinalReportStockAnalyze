const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

const insertData = (insertValues) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO mi_index(`index`, closing_index, rise_and_fall, point_change, percentage_change, special_handling_note, create_date, update_date) VALUES ?'
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
