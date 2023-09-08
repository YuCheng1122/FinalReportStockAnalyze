require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 8080
const routes = require('./src/routes')

// ... 其他代碼

// 不需要 db.connect() 和 db.end()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', routes.userRoutes)
app.use('/api/weather', routes.weatherRedictRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
