const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { PORT, MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')

if (!MONGODB_URI) {
  error('MONGODB URI not set')
  process.exit(1)
}

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

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

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':body :method :url :status :res[content-length] - :response-time ms')
)

app.get('/api/info', (request, response) => {
  response.json({ content: 'blog api' })
})
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((err) => {
      error('error connecting to db', err)
    })
})

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
