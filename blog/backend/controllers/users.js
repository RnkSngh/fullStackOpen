const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  response.json({ users })
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })
  if (user) {
    response.json({ user })
  } else {
    response.status(404).end()
  }
})

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (!password || password.length < 3) {
    response
      .status(400)
      .send({ error: 'password length must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({ username, passwordHash, name })
  await newUser.save()
  response.json({ newUser })
})

module.exports = userRouter
