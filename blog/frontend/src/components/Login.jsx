import { useState } from 'react'
import loginService from '../services/login'
import {
  useSetErrorNotification,
  useSetNotification,
} from '../reducers/notificationContext'
import { useSetUser } from '../reducers/UserContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const setErrorMessage = useSetErrorNotification()
  const setMessage = useSetNotification()
  const setUser = useSetUser()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const result = await loginService.loginUser(username, password)
      window.localStorage.setItem('blogApp.user', JSON.stringify(result))
      setUser(result)
      setUsername('')
      setPassword('')
      setMessage('logged in successfully')
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      Login
      <div>
        <input
          type="text"
          name="Username"
          value={username}
          id="login-username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          name="Password"
          id="login-password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit"> submit </button>
    </form>
  )
}

export default Login
