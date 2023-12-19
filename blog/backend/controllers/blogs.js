const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

const bearerTokenFromRequest = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const userFromBearerToken = async (request, response) => {
  const token = bearerTokenFromRequest(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    response.status(400).send({ error: 'Invalid token' })
  }
  return decodedToken.id
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).sort({ likes: -1 }).populate('creator', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const foundBlogPost = await Blog.findById(request.params.id)
    .populate('creator', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  if (foundBlogPost) {
    response.json(foundBlogPost)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const userId = await userFromBearerToken(request, response)
  const user = await User.findById(userId)

  const blog = new Blog({ ...request.body, creator: user.id })

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  newBlog.creator = user
  response.status(201).json(newBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  await userFromBearerToken(request, response)

  const blog = await Blog.findByIdAndUpdate(id, {
    ...request.body,
  })
  await blog.save()
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await userFromBearerToken(request, response)
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
  await userFromBearerToken(request, response)
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  const newComment = new Comment({
    content: request.body.content,
    blog: blog.id,
  })
  await newComment.save()
  blog.comments = [...blog.comments, newComment.id]
  await blog.save()
  response.json(newComment)
})

module.exports = blogsRouter
