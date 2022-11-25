import { useEffect, useState } from "react";
import {
  useQuery,
  // useMutation,
  useSubscription,
  useApolloClient,
  // gql,
} from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Recommend from "./components/Recommend";

import {
  ALL_AUTHORS,
  ALL_BOOKS,
  // AUTHOR_ADDED,
  BOOK_ADDED,
  // ME,
  // BOOK_DETAILS,
  LOGGED_USER,
} from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();
  const loggedUser = useQuery(LOGGED_USER);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      notification(`${addedBook.title} by ${addedBook.author.name} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("library-user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

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
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      {token && page === "login" ? setPage("authors") : null}
      <Authors show={page === "authors"} authors={result.data.allAuthors} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} user={loggedUser.data.me} />
      <Login
        setToken={setToken}
        setError={notification}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
