import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'blog title test',
  author: 'Blog author test',
  creator: { username: '123948' },
  url: 'http://testurl.com',
  likes: 42,
}

describe('BlogTests', () => {
  let container
  const mockIncrementLike = jest.fn()
  const mockDeleteBLog = jest.fn()
  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        incrementLike={mockIncrementLike}
        deleteBlog={mockDeleteBLog}
      />
    ).container
  })

  test('Blog item defaults to only showing title and author', async () => {
    screen.findByText(blog.title)
    const toggleableItem = container.querySelector('.togglableContent')
    expect(toggleableItem).toHaveStyle('display:none')
    expect(toggleableItem.querySelector('.h1')).toBeNull() // Shouldn't have the title in there
  })

  test('Blog url and details are shown when shown button is clicked', async () => {
    const button = screen.getByText('show')
    const user = await userEvent.setup()
    await user.click(button)
    const toggleableItem = container.querySelector('.togglableContent')
    expect(toggleableItem).not.toHaveStyle('display: none')
    screen.findByText(`author: ${blog.author}`)
    screen.findByText(blog.url)
    screen.findByText(`likes: ${blog.likes}`)
  })

  test('likes are incremented each time like button is clicked', async () => {
    const button = screen.getByText('show')
    const user = await userEvent.setup()
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    screen.findByText(`likes: ${blog.likes + 1}`)
    await user.click(likeButton)
    screen.findByText(`likes: ${blog.likes + 2}`)
    expect(mockIncrementLike.mock.calls).toHaveLength(2)
  })
})
