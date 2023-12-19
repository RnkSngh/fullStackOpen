import { useQuery } from "@apollo/client";
import { RECOMMENDED } from "../queries";
import Book from "./Book";
import { useEffect, useState } from "react";

const Recommended = ({ show }) => {
  const [recommended, setRecommended] = useState([]);
  const recommendedResult = useQuery(RECOMMENDED, {
    onError: (e) => {
      console.log("error occurred", e.message);
    },
  });

  useEffect(() => {
    if (recommendedResult.data && recommendedResult.data.recommendedBooks) {
      setRecommended(recommendedResult.data.recommendedBooks);
    }
  }, [recommendedResult.data]);

  if (!show) {
    return null;
  }
  return recommended.length === 0 ? (
    <div> loading books...</div>
  ) : (
    <div>
      <h2> Books based on your recommended genre: </h2>
      {
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommended.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default Recommended;
