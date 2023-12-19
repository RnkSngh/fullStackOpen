import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Note from './notes'
import userEvent from '@testing-library/user-event'

const note = {
  content: 'Component testing is done with react-testing-library',
  important: true,
}

test('renders content', () => {
  const { container } = render(<Note note={note} />)

  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the toggle importance note once', async () => {
  const mockHandler = jest.fn()
  render(<Note note={note} toggleImportant={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('Make Unimportant')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
