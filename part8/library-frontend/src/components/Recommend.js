import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";

const Recommend = ({ show, user }) => {
  console.log("user check ", user);
  const favoriteGenre = user ? user.favoriteGenre : null;
  const books = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((book) =>
            book.genres.includes(favoriteGenre) ? (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
