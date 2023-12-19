import { useQuery, useSubscription, useMutation } from "@apollo/client";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import PhoneForm from "./components/PhoneForm";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import LoginForm from "./components/LoginForm";

export const updateCache = (cache, query, addedPerson) => {
  const uniqueByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqueByName(allPersons.concat(addedPerson)),
    };
  });
};

function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();
  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`Added Person ${addedPerson.name}`);
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });

  if (result.loading) {
    return <div> loading ...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify}></LoginForm>
      </>
    );
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}> logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonsForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

const Notify = ({ errorMessage }) => {
  return errorMessage ? (
    <div style={{ color: "red" }}>{errorMessage}</div>
  ) : null;
};

export default App;
