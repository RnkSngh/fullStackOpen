import { useState } from "react";

export const useForm = (type) => {
  const [value, setState] = useState("");

  const onChange = (e) => {
    console.log("changing");
    setState(e.target.value);
  };

  const clear = () => {
    setState("");
  };

  return {
    type,
    value,
    onChange,
    clear,
  };
};
