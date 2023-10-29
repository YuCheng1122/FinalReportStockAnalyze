const path = require('path')
const puppeteer = require('puppeteer')
const mysql = require('mysql')
const axios = require('axios')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
})
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

const url = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JYcG9MVlJYR2dKVVZ5Z0FQAQ?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant'
const dbConfig = {
  host: 'localhost',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
}

const connection = mysql.createConnection({
  ...dbConfig,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
})

async function fetchData(url) {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const articles = await page.evaluate(() => {
      const articleNodes = document.querySelectorAll('article.IFHyqb.DeXSAc')
      const results = []

      articleNodes.forEach((article) => {
        const titleElement = article.querySelector('h4.JtKRv')
        const title = titleElement ? titleElement.textContent : ''

        const timeElement = article.querySelector('time.hvbAAd')
        const time = timeElement ? timeElement.textContent : ''

        const linkElement = article.querySelector('a.WwrzSb')
        const link = linkElement ? linkElement.getAttribute('href').replace('./', 'https://news.google.com/') : ''

        const imgElement = article.querySelector('img.Quavad')
        const imageSrc = imgElement ? imgElement.getAttribute('srcset') : ''

        results.push({
          title,
          time,
          link,
          imageSrc,
        })
      })

      return results
    })

    for (const article of articles) {
      const query = 'INSERT INTO googlenewsarticles SET ?'
      connection.query(query, article, (error, results) => {
        if (error) {
          console.error('Error inserting data:', error)
          return
        }
        console.log('Inserted:', results.insertId)
      })
    }

    await browser.close()
    connection.end()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData(url)
