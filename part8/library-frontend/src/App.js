import { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Notification from "./components/Notification";

import { ALL_AUTHORS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHORS);

  const client = useApolloClient();

  if (result.loading) {
    return <>loading...</>;
  }

  const notification = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    setPage("authors");
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      {token && page === "login" ? setPage("authors") : null}
      <Authors show={page === "authors"} authors={result.data.allAuthors} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Login
        setToken={setToken}
        setError={notification}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
