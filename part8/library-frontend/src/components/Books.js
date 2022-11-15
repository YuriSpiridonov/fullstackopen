import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const getGenres = (books) => {
  const genres = [];
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });
  return genres;
};

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;
  const genres = getGenres(books);

  const filterBooks = () => {
    if (!selectedGenre) {
      return books;
    }
    return books.filter((book) => book.genres.includes(selectedGenre));
  };

  return (
    <div>
      <h2>books</h2>
      <div>
        {selectedGenre ? (
          <p>
            in genre <strong>{selectedGenre}</strong>
          </p>
        ) : null}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks(books).map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button key={"null"} onClick={() => setSelectedGenre(null)}>
          all books
        </button>
      </div>
    </div>
  );
};

export default Books;
