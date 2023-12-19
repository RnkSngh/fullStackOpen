import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewBlog from './NewBlog'
import { userEvent } from '@testing-library/user-event'

const newBlogInput = {
  title: 'New Blog Title',
  author: 'New Blog Author',
  url: 'url://newBlog.com',
}

describe('<NewBlog/>', () => {
  let container
  let userToken = 'usertoken'
  let setErrorMessage = jest.fn()
  let clearMessages = jest.fn()
  let handleBlogSubmit = jest.fn()

  beforeEach(() => {
    container = render(
      <NewBlog
        handleBlogSubmit={handleBlogSubmit}
        userToken={userToken}
        setErrorMessage={setErrorMessage}
        clearMessages={clearMessages}
      />
    ).container
  })

  test('newBlog component calls new blog action with the right arguments', async () => {
    const user = userEvent.setup()
    const submitButton = screen.getByText('submit')
    const titleField = container.querySelector('#title-input')
    const authorField = container.querySelector('#author-input')
    const urlField = container.querySelector('#url-input')
    await user.type(titleField, newBlogInput.title)
    await user.type(authorField, newBlogInput.author)
    await user.type(urlField, newBlogInput.url)
    await user.click(submitButton)

    expect(handleBlogSubmit.mock.calls).toHaveLength(1)
    expect(handleBlogSubmit.mock.calls[0][0]).toEqual(newBlogInput)
  })
})
