import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
  }

  return state;
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, "");
  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  return dispatch;
};

export default NotificationContext;
