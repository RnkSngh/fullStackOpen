const express = require('express')
const app = express()
const cors = require('cors')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')

const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')

if (!MONGODB_URI) {
  error('MONGODB URI not set')
  process.exit(1)
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info('connected to mongodb')
  })
  .catch(() => {
    error(`can'${''}t connect to mongodb`)
  })

app.use(cors())
app.use(express.json())

app.use(
  middleware.morgan(
    ':body :method :url :status :res[content-length] - :response-time ms'
  )
)

app.get('/api/info', (request, response) => {
  response.json({ content: 'blog api' })
})

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
