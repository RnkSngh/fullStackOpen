import { useState } from 'react'
import {
  useSetErrorNotification,
  useSetNotification,
} from '../reducers/notificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUser } from '../reducers/UserContext'
import { Button, Form } from 'react-bootstrap'

const NewBlog = ({ addNewBlogRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const setErrorMessage = useSetErrorNotification()
  const queryClient = useQueryClient()
  const user = useUser()
  const setNotification = useSetNotification()

  const newBlogMutation = useMutation({
    mutationFn: (newBlog) =>
      blogService.newBlog(
        newBlog.title,
        newBlog.author,
        newBlog.url,
        user.token
      ),
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, newBlog])
    },
  })

  const handleBlogSubmit = async (newBlog) => {
    setNotification(`New Blog added: ${newBlog.title}`)
    newBlogMutation.mutate(newBlog)
    addNewBlogRef.current.toggleVisibility()
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      handleBlogSubmit({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      setErrorMessage(e.message)
    }
  }
  return (
    <div>
      <h2> Add new blog </h2>
      <Form onSubmit={(e) => handleNewBlog(e)}>
        <Form.Group>
          <Form.Label> title: </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />

          <Form.Label htmlFor="author"> author: </Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />

          <Form.Label htmlFor="Url"> url: </Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
          <Button type="submit"> submit </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog
