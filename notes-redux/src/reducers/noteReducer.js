import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

export const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      state.push({ content, important: false, id: generateId() });
    },
    appendNote(state, action) {
      return [...state, action.payload];
    },
    setNotes(state, action) {
      return action.payload;
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      return state.map((note) => {
        return note.id === id ? { ...note, important: !note.important } : note;
      });
    },
  },
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};
