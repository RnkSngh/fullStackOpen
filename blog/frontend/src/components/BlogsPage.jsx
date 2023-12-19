import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const BlogsPage = () => {
  const addNewBlogRef = useRef()

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  return (
    <div>
      <Togglable ref={addNewBlogRef} buttonName="add new blog">
        <NewBlog />
      </Togglable>
      <h2>blogs</h2>
      {blogsResult.isLoading ? (
        <div> loading blogs ...</div>
      ) : (
        blogsResult.data.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`blogs/${blog.id}`}> {blog.title}</Link>
          </div>
        ))
      )}
    </div>
  )
}

export default BlogsPage
