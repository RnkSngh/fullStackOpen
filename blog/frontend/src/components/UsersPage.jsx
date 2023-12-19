import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import userServices from '../services/users'

const UserRow = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name} </Link>
      </td>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const UsersPage = ({}) => {
  const padding = { borderSpacing: '15px', textAlign: 'center' }
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userServices.getAllUsers,
  })
  return (
    <div>
      {' '}
      {usersResult.isLoading ? (
        <p> loading users ...</p>
      ) : (
        <table style={padding}>
          <caption>Users page</caption>
          <thead>
            <tr>
              <th> Name</th>
              <th> Username </th>
              <th> Number of blogs</th>
            </tr>
          </thead>
          <tbody>
            {usersResult.data.users.map((user) => (
              <UserRow user={user} key={user.username}></UserRow>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UsersPage
