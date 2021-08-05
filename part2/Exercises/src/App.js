import React, { useState, useEffect} from 'react'
import Note from './components/notes'
import noteService from "./services/notes"
import Notification from './components/Notification'
import Footer from './components/Footer'
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(
    "... a new note"
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState("some error")
  useEffect(() => {
    console.log("effect");
    noteService
      .getAll()
      .then( initialNotes => {
        setNotes(initialNotes)
    })
  }, [])
  console.log("render", notes.length, "notes");

  const addNote = (event) =>{
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < .5,
      //id: notes.length +1
    }
    // setNotes(notes.concat(noteObject));
    // setNewNote("");

    noteService
      .create(noteObject)
      .then( newNote => {
        setNotes(notes.concat(newNote))
        setNewNote("")
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleNoteImportance = (id) => {
    console.log(`the note id ${id} is  `);
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote)
      .then( newNote => {
        setNotes(notes.map(note => note.id===id? newNote : note))
    })
      .catch(error => {
        setErrorMessage(`${note.content} is not an existing note`)
        setTimeout( () => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter( n => n.id!== note.id))
      })

  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)
  

  return (
    <div>
      <h1>Notes</h1>
      <Notification className="error" message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll) }>
          Show {showAll? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportant={ () => toggleNoteImportance(note.id)} >
            {note.content}
          </Note>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">
          save
        </button>
      </form>
      <Footer/>
    </div>
  )
}

export default App