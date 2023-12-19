import { createContext, useContext, useReducer } from 'react'

const initialUserState = {
  username: '',
  name: '',
  blogs: [],
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return initialUserState
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const [user, dispatch] = useContext(UserContext)
  return user
}

export const useClearUser = () => {
  const [user, dispatch] = useContext(UserContext)
  return () => {
    dispatch({ type: 'CLEAR_USER' })
  }
}

export const useSetUser = () => {
  const [user, dispatch] = useContext(UserContext)
  return ({ username, name, blogs, token }) => {
    dispatch({ type: 'SET_USER', payload: { username, name, blogs, token } })
  }
}

export default UserContext
