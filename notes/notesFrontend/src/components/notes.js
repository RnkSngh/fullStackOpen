
import React from 'react'

const Note = ({note, toggleImportant}) => {
  let buttonContent = note.important ? "Make Unimportant" : "Make Important"
  return(
    <li className="note">{note.content}
    <button onClick={toggleImportant}> {buttonContent} </button>
    </li>
  )
}

export default Note