const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.log('MONGODB URI not set')
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
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('can\'t connect to mongodb')
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
  console.log('api blog endpoint')
  console.log('connecting to api', request.body)
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((err) => {
      console.log('error connecting to db', err)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
