import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";

const NewAuthorForm = ({ authors }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({
      variables: {
        name: e.target.author.value,
        born: parseInt(e.target.born.value),
      },
    });

    e.target.author.value = "";
    e.target.born.value = "";
  };

  return (
    <div>
      {" "}
      <h1>Edit Author</h1>
      <form onSubmit={handleSubmit}>
        <select name="author">
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <label htmlFor="born">Born: </label>
        <input type="number" name="born"></input>
        <button type="submit"> update author </button>
      </form>
    </div>
  );
};

export default NewAuthorForm;
