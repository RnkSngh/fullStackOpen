const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const hash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash: hash,
    })

    await user.save()
  })

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserData = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(newUserData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const addedUser = usersAtEnd.find((user) => user.name === newUserData.name)
    expect(addedUser.username).toEqual(newUserData.username)
  })

  test('creation fails with proper statuscode and message if user already taken', async () => {
    const beforeUserData = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    expect(await helper.usersInDb()).toEqual(beforeUserData)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
