const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username: username })
  if (user === null || !(await bcrypt.compare(password, user.passwordHash))) {
    response.status(400).send({ error: 'user or password not found' })
  } else {
    const userForToken = {
      id: user._id,
      username: user.username,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  }
})

module.exports = loginRouter
