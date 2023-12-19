import PropTypes from 'prop-types'
const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        id="username"
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>

    <div>
      password
      <input
        type="text"
        value={password}
        name="Password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <div>
      <button id="login-button" type="submit"> login </button>
    </div>
  </form>
)

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default Login
