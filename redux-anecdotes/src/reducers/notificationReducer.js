import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  initialState,
  name: "notification",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export const { clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, timeout*1000);
  };
};
