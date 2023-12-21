import axios from "axios";
import { NewNote, Note } from "../../types";
const baseUrl = "http://localhost:3001/api/notes";

export const getAllNotes = () => {
  return axios.get<Note[]>(baseUrl).then((res) => res.data);
};

export const addNewNote = (newNote: NewNote) => {
  return axios.post<Note>(baseUrl, newNote).then((res) => res.data);
};
