const db = require('../config/databaseConnect')

const selectAll = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM weather'
    db.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        reject({ message: `/src/weather.models.js selectTemper have some error, ${error.message}` })
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { selectAll }
