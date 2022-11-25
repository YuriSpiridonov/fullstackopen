import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = ({ setError, setToken, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    refreshPage();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username:{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)} // what is it? target
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
