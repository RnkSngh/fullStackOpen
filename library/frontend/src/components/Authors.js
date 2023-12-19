import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import NewAuthorForm from "./NewAuthor";

const padding = { padding: "2px" };
const Authors = (props) => {
  const authorsResult = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>

      {authorsResult.loading ? (
        <div>loading authors...</div>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authorsResult.data.allAuthors.map((a) => (
                <tr key={a.name}>
                  <td sytle={padding}>{a.name}</td>
                  <td style={padding}>{a.born}</td>
                  <td style={padding}>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <NewAuthorForm authors={authorsResult.data.allAuthors} />
        </div>
      )}
    </div>
  );
};

export default Authors;
