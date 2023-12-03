const db = require('../config/databaseConnect')
const { AppError } = require('../config/error_classes')

// 獲取所有新聞文章
const getAllArticles = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT news_id,title,time,link,imageSrc,update_date FROM googlenewsarticles'
    db.query(sql, (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getAllArticles', 4))
      } else {
        resolve(results)
      }
    })
  })
}
// 獲取當天的文章
const getArticlesOfToday = () => {
  return new Promise((resolve, reject) => {
    const today = new Date().toISOString().split('T')[0] // 獲取當天日期
    const sql = `SELECT news_id,title,time,link,imageSrc FROM googlenewsarticles WHERE DATE(create_date) = ?`
    db.query(sql, [today], (error, results) => {
      if (error) {
        reject(new AppError(error, 'SqlError', 'getArticlesOfToday', 4))
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { getAllArticles, getArticlesOfToday }
