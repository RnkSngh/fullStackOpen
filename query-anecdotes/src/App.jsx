import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllAnecdotes, putAnecdote } from "./requests";
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const changeAnecdoteMutation = useMutation({
    mutationFn: putAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    changeAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `Voted for anecdote ${anecdote.content}`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  try {
    const result = useQuery({
      queryKey: ["anecdotes"],
      queryFn: getAllAnecdotes,
      retry: 1,
    });

    if (result.isLoading) {
      return <div> loading ...</div>;
    }
    const anecdotes = result.data;

    return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (e) {
    return <div> anecdote service not available</div>;
  }
};

export default App;
