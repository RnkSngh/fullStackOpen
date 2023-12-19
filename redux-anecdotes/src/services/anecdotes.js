import axios from "axios";
import { newAnecdote } from "../reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";

const fetchAllAnecdotes = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const createNewAnecdote = async (content) => {
  const result = await axios.post(baseUrl, { content, votes: 0 });
  return result.data;
};

const putAnecdote = async (anecdote) => {
  const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return result.data;
};

export default { fetchAllAnecdotes, createNewAnecdote, putAnecdote };
