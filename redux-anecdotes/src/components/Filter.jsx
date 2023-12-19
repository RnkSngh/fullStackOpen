import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/searchReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter: <input type="text" name="filter" onChange={handleInputChange} />
    </div>
  );
};

export default Filter;
