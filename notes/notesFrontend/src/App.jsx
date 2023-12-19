import React, { useState, useEffect, useRef } from 'react'
import Note from './components/notes'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginServices from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote))
    })
  }

  const toggleNoteImportance = (id) => {
    console.log(`the note id ${id} is  `)
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then((newNote) => {
        setNotes(notes.map((note) => (note.id === id ? newNote : note)))
      })
      .catch((error) => {
        setErrorMessage(`${note.content} is not an existing note`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== note.id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification className="error" message={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            setUsername={setUsername}
            handleLogin={handleLogin}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          {' '}
          <p> {`${user.name} logged in`} </p>
          <Togglable buttonLabel="add note" ref={noteFormRef}>
            <NoteForm submitNote={addNote} />
          </Togglable>
        </div>
      )}
      <h2>Notes </h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportant={() => toggleNoteImportance(note.id)}
          >
            {note.content}
          </Note>
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App
