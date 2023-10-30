const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((err) => {
      logger.error(err)
      next(err)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((err) => {
      logger.error('error connecting to db', err)
      next(err)
    })
})

module.exports = blogsRouter
