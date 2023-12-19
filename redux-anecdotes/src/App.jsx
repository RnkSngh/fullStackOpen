import AnecdoteList from "./components/AnecdoteList";
import NewAnecdoteForm from "./components/NewAnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  });
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
