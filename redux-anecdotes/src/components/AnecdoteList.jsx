import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote));
    dispatch(setNotification(`Vou voted for ${anecdote.content}`, 1));
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== "") {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
    }
    return anecdotes;
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .slice()
        .sort((a, b) => {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
          <Anecdote anecdote={anecdote} key={anecdote.id} />
        ))}
    </div>
  );
};

export default AnecdoteList;
