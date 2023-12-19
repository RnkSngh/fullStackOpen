import { useDispatch } from "react-redux";
import { filterReducer} from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      all{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterReducer("ALL"))}
      />
      important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterReducer("IMPORTANT"))}
      />{" "}
      nonimportant{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterReducer("NONIMPORTANT"))}
      />
    </div>
  );
};

export default VisibilityFilter;
