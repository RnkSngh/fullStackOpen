const listHelper = require('../utils/list_helper')

test('dummy returns one ', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  test('of empty likes is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },

      {
        _id: '5a822ca71b54a676234d17f9',
        title: 'That how u get the girl',
        author: 'Swifftie',
        url: 'http://www.adsfasf.html',
        likes: 325,
        __v: 2,
      },

      {
        _id: '5a422aa71c54a676234f27f8',
        title: 'Hello ',
        author: 'Taylor',
        url: 'http://1989tvtrash.com',
        likes: 124,
        __v: 3,
      },
    ]
    expect(listHelper.totalLikes(blogs)).toBe(454)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  test('of empty likes is zero', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })
  test('when list has only one blog the blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    })
  })

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },

      {
        _id: '5a822ca71b54a676234d17f9',
        title: 'That how u get the girl',
        author: 'Swifftie',
        url: 'http://www.adsfasf.html',
        likes: 325,
        __v: 2,
      },

      {
        _id: '5a422aa71c54a676234f27f8',
        title: 'Hello ',
        author: 'Taylor',
        url: 'http://1989tvtrash.com',
        likes: 124,
        __v: 3,
      },
    ]
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'That how u get the girl',
      author: 'Swifftie',
      likes: 325,
    })
  })
})
