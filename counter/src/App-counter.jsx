import { useState } from "react";

const useCounter = () => {
  const [counter, setCounter] = useState();
  const zero = () => {
    setCounter(0);
  };
  const increase = () => {
    setCounter(counter + 1);
  };
  const decrease = () => {
    setCounter(counter - 1);
  };

  return {
    zero,
    increase,
    decrease,
    value: counter,
  };
};

const useField = (type) => {
  const [state, setState] = useState("");

  const handleChange = (e) => {
    setState(e.target.value);
  };

  return {
    type,
    state,
    handleChange,
  };
};

function App() {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");


  return (
    <div>
      <form>
        <input {...name} />
        <br />
        <input {...born} />
        <br />
        <input {...height} />
        <br />
      </form>
      <div>
        {" "}
        {name.value} {born.value} {height.value}{" "}
      </div>
    </div>
  );
}

export default App;
