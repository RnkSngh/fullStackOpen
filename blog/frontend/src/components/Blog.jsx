import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUser } from '../reducers/UserContext'
import blogService from '../services/blogs'
import {
  useSetErrorNotification,
  useSetNotification,
} from '../reducers/notificationContext'
import { useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = () => {
  const id = useParams().id
  const user = useUser()
  const setNotification = useSetNotification()
  const setErrorNotification = useSetErrorNotification()
  const queryClient = useQueryClient()
  const blogResult = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogService.getOne(id),
  })

  const updateBlogMutation = useMutation({
    mutationFn: (newBlog) => blogService.updateBlog(newBlog, user.token),
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blogItem) =>
          blogItem.id !== newBlog.id
            ? blogItem
            : { ...blogItem, likes: blogItem.likes + 1 }
        )
      )
      const blog = queryClient.getQueryData(['blog'])
      queryClient.setQueryData(['blog'], { ...blog, likes: blog.likes + 1 })
    },
  })

  const commentBlogMutation = useMutation({
    mutationFn: (comment) => blogService.commentBlog(id, comment, user.token),
    onSuccess: (newComment) => {
      console.log('onsuccess', newComment)
      const prevBlog = queryClient.getQueryData(['blog'])
      console.log('prev blog', prevBlog)
      const newComments = [...prevBlog.comments, newComment]
      queryClient.setQueryData(['blog'], {
        ...prevBlog,
        comments: [...prevBlog.comments, newComment],
      })
    },
  })

  const handleLikeIncrement = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
      creator: blog.creator.id, // Since mongoose only wants creator id
    }

    try {
      await updateBlogMutation.mutate(newBlog)
      setNotification(`liked  ${blog.title} `)
    } catch (e) {
      setErrorNotification('Error sending like')
    }
  }
  const deleteBlogMutation = useMutation({
    mutationFn: (deleteBlogId) => {
      blogService.deleteBlog(deleteBlogId, user.token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleDeleteBlog = async (blogToDelete) => {
    if (window.confirm(`Delete blog ${blogToDelete.title}?`)) {
      deleteBlogMutation.mutate(blogToDelete.id)
      setNotification('Blog deleted successfully!')
    }
  }
  if (blogResult.isLoading) {
    return <div> blog is loading ...</div>
  }

  const handleComment = (e) => {
    e.preventDefault()
    commentBlogMutation.mutate(e.target.comment.value)
    // blogService.commentBlog(id, e.target.comment.value, user.token)
    e.target.comment.value = ''
  }

  const blog = blogResult.data

  return (
    <div style={blogStyle} className="blog">
      <h1> {blog.title}</h1>
      <ul>
        {' '}
        <li className="authorItem">author: {blog.author}</li>
        <li>
          {' '}
          likes: {blog.likes}{' '}
          <Button onClick={() => handleLikeIncrement(blog)}> like </Button>
        </li>
        {blog.creator ? <li> by: {blog.creator.username} </li> : null}
        <li> {blog.url} </li>{' '}
        {blog.creator.username === user.username && (
          <Button onClick={() => handleDeleteBlog(blog)}> delete </Button>
        )}
      </ul>
      <h1>Comments</h1>
      <Form onSubmit={(e) => handleComment(e)}>
        <Form.Group>
          <Form.Control name="comment" type="text"></Form.Control>
          <Button type="submit"> Submit Comment </Button>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <li key={comment.id}> {comment.content}</li>
          ))
        ) : (
          <div> No comments yet! </div>
        )}
      </ul>
    </div>
  )
}

export default Blog
