const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/tests')

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
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/tests', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
