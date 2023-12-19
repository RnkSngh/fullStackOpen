import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useUser } from '../reducers/UserContext'
import {
  useSetNotification,
  useSetErrorNotification,
} from '../reducers/NotificationContext'

const BlogsPage = () => {
  const id = useParams().id
  const user = useUser()
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()
  const setErrorNotification = useSetErrorNotification()

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

  return blogResult.isLoading ? (
    <div> loading blogs ...</div>
  ) : (
    <div>
      <h1>{blogResult.data.title}</h1>{' '}
      <a href={blogResult.data.url}> {blogResult.data.url}</a>{' '}
      <div>
        {' '}
        likes: {blogResult.data.likes}{' '}
        <button onClick={(e) => handleLikeIncrement(blogResult.data)}>
          {' '}
          like{' '}
        </button>
      </div>{' '}
      <div> added by {blogResult.data.creator.username}</div>{' '}
    </div>
  )
}

export default BlogsPage
