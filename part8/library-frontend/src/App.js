import { useState } from "react";
import { useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { ALL_AUTHORS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <>loading...</>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={result.data.allAuthors} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
