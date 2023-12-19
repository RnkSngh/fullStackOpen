import { useContext } from 'react'
import NotificationContext from '../reducers/notificationContext'

const Notification = (props) => {
  const [notification, dispatch] = useContext(NotificationContext)
  return (
    notification.notification && (
      <div className={notification.isError ? 'error' : 'notification'}>
        {notification.notification}
      </div>
    )
  )
}

export default Notification
