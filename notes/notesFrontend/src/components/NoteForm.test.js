import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm/> updates parent state and calls onSubmiit', async () => {
  const createNote = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<NoteForm submitNote={createNote} />)

  const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing this form')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing this form')
})
