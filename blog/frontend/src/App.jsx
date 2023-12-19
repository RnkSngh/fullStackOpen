import { useEffect } from 'react'
import Notification from './components/Notification'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import LoginPage from './components/Login'
import UserHeading from './components/UserHeading'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom'
import { useSetUser, useUser } from './reducers/UserContext'
import BlogsPage from './components/BlogsPage'
import Blog from './components/Blog'

const padding = { padding: '5px' }

const AppRoutes = ({ user }) => {
  return (
    <Router>
      <div style={padding}>
        {[
          { text: 'Users', to: '/users' },
          { text: 'Home', to: '/' },
        ].map((elem) => (
          <Link key={elem.text} style={padding} to={elem.to}>
            {elem.text}
          </Link>
        ))}
      </div>
      {user && <UserHeading user={user} />}
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/"
          element={
            user.username ? (
              <BlogsPage user={user} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route
          path="/login"
          element={user.username ? <Navigate replace to="/" /> : <LoginPage />}
        />
      </Routes>
    </Router>
  )
}

const App = () => {
  const setUser = useSetUser()
  const user = useUser()

  useEffect(() => {
    const user = window.localStorage.getItem('blogApp.user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <div>
      <Notification />
      <AppRoutes user={user} />
    </div>
  )
}

export default App
