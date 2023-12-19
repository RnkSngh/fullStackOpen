const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newBlogObjects = helper.initialBlogs.map((item) => new Blog(item))
  await Promise.all(newBlogObjects.map((blog) => blog.save()))
})

test('get route returns blogs', async () => {
  const response = await api
    .get('/api/blogs/')
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)

  const titles = response.body.map((item) => item.title)
  const authors = response.body.map((item) => item.author)
  const urls = response.body.map((item) => item.url)
  const likes = response.body.map((item) => item.likes)
  helper.initialBlogs.map((item) => {
    expect(titles).toContain(item.title)
    expect(authors).toContain(item.author)
    expect(urls).toContain(item.url)
    expect(likes).toContain(item.likes)
  })
})

test('post route adds a new blog', async () => {
  const newBlog = {
    title: 'NewBlog',
    author: 'Author New Blog',
    url: 'http://newBlog.com',
    likes: 1213,
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const newBlogs = await helper.allBlogsInDb()
  expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1)
  const titles = newBlogs.map((item) => item.title)
  const authors = newBlogs.map((item) => item.author)
  const urls = newBlogs.map((item) => item.url)
  const likes = newBlogs.map((item) => item.likes)

  expect(titles).toContain(newBlog.title)
  expect(urls).toContain(newBlog.url)
  expect(authors).toContain(newBlog.author)
  expect(likes).toContain(newBlog.likes)
})

test('blogs contain id property', async () => {
  const currentBlogs = await helper.allBlogsInDb()
  currentBlogs.map((item) => expect(item.id).toBeDefined())
})

test('likes initialize to 0', async () => {
  const newBlog = {
    title: 'NewBlog',
    author: 'Author New Blog',
    url: 'http://newBlog.com',
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const afterBlogs = await helper.allBlogsInDb()
  const newBlogEntry = afterBlogs.find((item) => item.title === newBlog.title)
  expect(newBlogEntry.likes).toEqual(0)
  expect(newBlogEntry.title).toEqual(newBlog.title)
  expect(newBlogEntry.author).toEqual(newBlog.author)
  expect(newBlogEntry.url).toEqual(newBlog.url)
})

test('missing title results in 400', async () => {
  const newBlog = {
    author: 'Author New Blog',
    url: 'http://newBlog.com',
    likes: 142,
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const afterBlogs = await helper.allBlogsInDb()
  expect(afterBlogs).toHaveLength(helper.initialBlogs.length)
})

describe('getting a specific note', () => {
  test('for valid data works correctly', async () => {
    const startingBlogsInDb = await helper.allBlogsInDb()
    const result = await api
      .get(`/api/blogs/${startingBlogsInDb[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toMatchObject(startingBlogsInDb[0])
  })

  test('with invalid id returns 404', async () => {
    const invalidId = await helper.getNewBlogId()
    await api.get(`/api/blogs/${invalidId}`).expect(404)
  })
  test('where the note is not found results in 400', async () => {
    const invalidId = '1245'
    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('deleting a note ', () => {
  test('with valid data works ', async () => {
    const startingBlogsInDb = await helper.allBlogsInDb()
    const deleteId = startingBlogsInDb[0].id

    await api.delete(`/api/blogs/${deleteId}`).expect(204)
    const blogsAfterDeleting = await helper.allBlogsInDb()

    expect(blogsAfterDeleting).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAfterDeleting.find((elem) => elem.id === deleteId)).toBe(
      undefined
    )
  })

  test('where the note is not found results in 400', async () => {
    const invalidId = '1245'
    await api.delete(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('adding a user', () => {
  test('adding a user can be done through the backend', async () => {
    const beforeUser = await helper.findUserByUsername('alice1')
    expect(beforeUser).toEqual(null)

    const password = '1234'
    await api
      .post('/api/users/')
      .send({ username: 'alice1', password, name: 'alice a' })
      .expect('Content-Type', /application\/json/)

    const newUser = await helper.findUserByUsername('alice1')
    expect(newUser.username).toEqual('alice1')
    expect(await bcrypt.compare(password, newUser.passwordHash)).toEqual(true)
    expect(newUser.name).toEqual('alice a')
  })
  test('a user cannot be added if username is already taken', async () => {
    await api
      .post('/api/users/')
      .send({ username: 'alice1', password: '1234', name: 'alice a' })
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users/')
      .send({ username: 'alice1', password: '1234', name: 'alice a' })
      .expect(400)

    const users = await helper.allUsersInDb()
    const matchingUsers = users.filter((user) => user.username === 'alice1')
    expect(matchingUsers.length).toEqual(1)
  })
  test('a user cannot be added if username is not at least 3 characters long', async () => {
    await api
      .post('/api/users/')
      .send({ username: 'al', password: '1234', name: 'alice a' })
      .expect(400)

    expect(await helper.findUserByUsername('al')).toEqual(null)
  })
  test('a user cannot be added if password is not at least 3 characters long', async () => {
    await api
      .post('/api/users/')
      .send({ username: 'alice1', password: '1', name: 'alice a' })
      .expect(400)
    expect(await helper.findUserByUsername('alice1')).toEqual(null)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
