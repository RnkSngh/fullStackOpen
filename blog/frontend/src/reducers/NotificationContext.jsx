import { createContext, useContext, useReducer } from 'react'

const initialState = { notification: '', isError: false }
const notificationReducer = (state, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.payload
  }
  if (action.type === 'CLEAR_NOTIFICATION') {
    return initialState
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationDispatch = () => {
  const notificationReducer = useContext(NotificationContext)
  return notificationReducer[1]
}

export const useClearNotification = () => {
  const notificationDispatch = useNotificationDispatch()
  return () =>
    notificationDispatch({
      type: 'CLEAR_NOTIFICATION',
    })
}

export const useSetNotification = () => {
  const notificationDispatch = useNotificationDispatch()
  return (message) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { notification: message, isError: false },
    })
    setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 1000)
  }
}

export const useSetErrorNotification = () => {
  const notificationDispatch = useNotificationDispatch()
  return (errorMessage) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { notification: errorMessage, isError: true },
    })
    setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 1000)
  }
}

export default NotificationContext
