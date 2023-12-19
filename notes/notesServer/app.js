const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

const MONGODB_URI = config.MONGODB_URI
if (!MONGODB_URI) {
  console.log('Set DB_URI variable in env file')
  process.exit(1)
}

mongoose.set('strictQuery', false)
logger.info('connecting to: ', MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to DB')
  })
  .catch((err) => {
    logger.error('error connecting to database', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(
  middleware.morgan(
    ':body :method :url :status :res[content-length] - :response-time ms'
  )
)

app.get('/', (request, response) => {
  response.send('hello world')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/tests')
  app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
