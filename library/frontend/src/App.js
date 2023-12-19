import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommended from "./components/Recommended";
import { ALL_BOOKS_FROM_GENRE, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [userToken, setUserToken] = useState("");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const newBook = data.data.bookAdded;
      window.alert(`New Book added: ${newBook.title}`);
      client.cache.updateQuery(
        { query: ALL_BOOKS_FROM_GENRE, variables: { genre: null } },
        ({ allBooks }) => {
          if (allBooks.find((book) => book.title === newBook.title)) {
            return {
              allBooks: allBooks.map((book) =>
                book.id === newBook.title ? newBook : book
              ),
            };
          }
          return {
            allBooks: allBooks.concat(newBook),
          };
        }
      );
    },
  });

  useEffect(() => {
    const prevToken = localStorage.getItem("libraryApp.userToken");
    if (prevToken) {
      setUserToken(prevToken);
    }
  }, []);

  const logout = () => {
    setUserToken("");
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {userToken && <button onClick={() => setPage("add")}>add book</button>}
        {userToken && <button onClick={logout}> logout</button>}
        {userToken && (
          <button onClick={() => setPage("recommended")}> recommended </button>
        )}
        {!userToken && (
          <button onClick={() => setPage("login")}> login </button>
        )}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <Recommended show={page === "recommended"} />
      <NewBook show={page === "add"} />
      <Login
        show={page === "login"}
        setToken={setUserToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
