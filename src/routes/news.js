const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

// 設定MySQL連接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'yourDatabase',
})

connection.connect()

// GET API
app.get('/api/news', (req, res) => {
  const query = 'SELECT * FROM yourTableName'

  connection.query(query, (error, results) => {
    if (error) {
      return res.json({ error: error })
    }
    res.json({ data: results })
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`)
})
