import { useState } from 'react'

const NoteForm = ({ submitNote }) => {
  const [note, setNote] = useState()

  const addNote = (e) => {
    e.preventDefault()
    submitNote({ content: note, important: true })

    setNote('')
  }

  return (
    <div className="formDiv">
      <h2>create a new Note</h2>
      <form onSubmit={addNote}>
        <input
          value={note}
          onChange={({ target }) => setNote(target.value)}
          placeholder="write note content here"
          id="note-input"
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
