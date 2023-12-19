import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAllAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const addNewAnecdote = (note) =>
  axios.post(baseUrl, note).then((res) => res.data);

export const putAnecdote = (note) =>
  axios.put(`${baseUrl}/${note.id}`, note).then((res) => res.data);
