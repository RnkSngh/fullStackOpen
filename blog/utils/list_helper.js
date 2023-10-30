const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {} 
  }
  return blogs.reduce(
    (favoriteBlog, item) => {
      console.log('favorite blog', favoriteBlog, item)
      if (favoriteBlog.likes === 0 || favoriteBlog.likes < item.likes) {
        console.log()
        return { title: item.title, author: item.author, likes: item.likes }
      } else {
        return favoriteBlog
      }
    },
    { likes: 0 }
  )
}

module.exports = { dummy, totalLikes, favoriteBlog }
