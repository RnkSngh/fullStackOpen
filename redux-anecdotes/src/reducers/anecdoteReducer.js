import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      return state.map((anecdote) => {
        return anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote;
      });
    },
    newAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { setAnecdotes, newAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.fetchAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdoteItem = await anecdoteService.createNewAnecdote(content);
    dispatch(newAnecdote(newAnecdoteItem));
  };
};

export const incrementVote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.putAnecdote(newAnecdote);
    dispatch(anecdoteSlice.actions.incrementVote(anecdote.id));
  };
};
