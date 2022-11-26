import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBornYear] = useState("");

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born } });

    setName("");
    setBornYear("");
  };

  const authors = props.authors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          <select onChange={({ target }) => setName(target.value)}>
            {/* All Authors in the list */}
            {/* {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))} */}

            {/* Authors without birth year */}
            {/* Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>. */}
            <option value="DEFAULT">
              {/* <option hidden disabled selected value> */}
              --- select an author ---
            </option>
            {authors.map((a) =>
              a && !a.born ? (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ) : null
            )}
          </select>
        </div>
        <div>
          <input
            value={born}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">Change Year</button>
      </form>
    </div>
  );
};

export default Authors;
