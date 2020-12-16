export {}
const mongoose = require('mongoose')
const DB_SERVER = process.env.DB_SERVER || 'localhost'
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME || 'blog'

mongoose.connect(
  `${DB_SERVER}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))
