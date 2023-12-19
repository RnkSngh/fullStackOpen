import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import searchReducer from "./reducers/searchReducer";
import notificationReducer from "./reducers/notificationReducer";

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: searchReducer,
    notification: notificationReducer,
  },
});
