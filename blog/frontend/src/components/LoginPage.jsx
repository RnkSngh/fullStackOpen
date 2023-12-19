import Togglable from './Togglable'
import Login from './Login'
const LoginPage = ({}) => {
  return (
    <div>
      <Togglable buttonName="login">
        {' '}
        <Login />
      </Togglable>
    </div>
  )
}

export default LoginPage
