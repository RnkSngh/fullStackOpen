import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { addNewNote, getAllNotes } from "./services/notes";

import { Note, NewNote } from "../types";

function App() {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "testing" }]);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addNewNote({ content: newNote }).then((response) => {
      setNotes(notes.concat(response));
    });

    setNewNote("");
  };

  useEffect(() => {
    getAllNotes().then((response) => {
      setNotes(response);
    });
  }, []);

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit"> add</button>
      </form>
      <ul>
        {notes.map((note) => {
          return <li key={note.id}> {note.content}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
