import { useClearUser } from '../reducers/UserContext'
import { Button } from 'react-bootstrap'
import { useSetNotification } from '../reducers/NotificationContext'
import { useNavigate } from 'react-router-dom'

const UserHeading = ({ user }) => {
  const clearUser = useClearUser()
  const navigate = useNavigate()
  const setNotification = useSetNotification()
  const handleLogout = () => {
    clearUser()
    window.localStorage.removeItem('blogApp.user')
    navigate('/')
    setNotification('Logged out successfully')
  }

  return (
    <div>
      <h1> Welcome: {user.name} </h1>
      <Button onClick={handleLogout}> logout </Button>
    </div>
  )
}

export default UserHeading
