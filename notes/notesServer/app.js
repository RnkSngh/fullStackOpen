const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const app = express()
const notesRouter = require('./controllers/notes')

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
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
