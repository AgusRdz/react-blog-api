require('dotenv').config()
const PORT = process.env.PORT || 3000
const BASE_URL = `/api/${process.env.VERSION || 'v1'}/`
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()
const fs = require('fs')
const cors = require('cors')
const { responseEnhancer } = require('express-response-formatter')
const sanitize = require('express-sanitizer')
require('./src/models/index')

app.use(logger('dev'))
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(sanitize())
app.use(responseEnhancer())
app.get('/', (req, res) => res.formatter.ok('success'))
fs.readdir('./src/routes', (err, files) => {
  if (err) console.error(err)

  files.forEach((file) => {
    app.use(BASE_URL, require(`./src/routes/${file}`))
  })
})

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`)
})

module.exports = app
