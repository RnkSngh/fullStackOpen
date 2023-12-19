import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { LOGIN, ME, RECOMMENDED } from "../queries";

const Login = ({ setToken, show, setPage }) => {
  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }, { query: RECOMMENDED }],
    onError: (e) => {
      console.log("error logging in", e.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const userToken = result.data.login.value;
      setToken(userToken);
      localStorage.setItem("libraryApp.userToken", userToken);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    login({
      variables: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });

    e.target.username.value = "";
    e.target.password.value = "";
    setPage("authors");
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username"> username: </label>
      <input name="username" type="text"></input>
      <label htmlFor="password"> password: </label>
      <input name="password" type="text"></input>
      <button type="submit"> login</button>
    </form>
  );
};

export default Login;
