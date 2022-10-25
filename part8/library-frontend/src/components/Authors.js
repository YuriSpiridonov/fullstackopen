// import { useState } from "react";
// import { useQuery } from "@apollo/client";

// import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  // console.group("props ", { props });
  if (!props.show) {
    return null;
  }
  // const authors = useQuery(ALL_AUTHORS); // eslint-disable-line
  // .data.allAuthors;
  // console.log(authors);
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
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
