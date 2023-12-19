const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },

  {
    title: 'That how u get the girl',
    author: 'Swifftie',
    url: 'http://www.adsfasf.html',
    likes: 325,
  },

  {
    title: 'Hello ',
    author: 'Taylor',
    url: 'http://1989tvtrash.com',
    likes: 124,
  },
]

const allBlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((item) => item.toJSON())
}
const allUsersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const findUserByUsername = async (username) => {
  const user = await User.findOne({ username })
  return user
}

const getNewBlogId = async () => {
  const newBlog = new Blog({
    title: 'abcadfa',
    author: 'talie',
    url: 'https',
    likes: 123,
  })
  await newBlog.save()
  await newBlog.deleteOne()
  return newBlog.id.toString()
}

module.exports = {
  initialBlogs,
  allBlogsInDb,
  getNewBlogId,
  allUsersInDb,
  findUserByUsername,
}
