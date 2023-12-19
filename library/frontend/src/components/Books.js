import { useEffect, useState } from "react";
import Book from "./Book";
import { useQuery } from "@apollo/client";
import { GENRES, ALL_BOOKS_FROM_GENRE } from "../queries";

const Books = ({ show }) => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const booksResult = useQuery(ALL_BOOKS_FROM_GENRE, {
    variables: {
      genre: selectedGenre.length > 0 ? selectedGenre : null,
    },
  });
  const genresResult = useQuery(GENRES);

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }
  }, [booksResult.data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Books</h2>
      {books.length === 0 || genresResult.loading ? (
        <div> loading books ...</div>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((a) => (
                <Book key={a.id} book={a}></Book>
              ))}
            </tbody>
          </table>
          <div>
            <h2> Select by genre: </h2>
            {genresResult.data.allGenres.map((genre) => (
              <button
                onClick={() => {
                  setSelectedGenre(genre);
                  booksResult.refetch();
                }}
                key={genre}
              >
                {" "}
                {genre}
              </button>
            ))}
            <button onClick={() => setSelectedGenre("")}> clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
