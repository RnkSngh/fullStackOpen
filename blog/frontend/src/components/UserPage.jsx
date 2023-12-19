import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const UserPage = () => {
  const id = useParams().id
  const userResult = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getUser(id),
  })

  return userResult.isLoading ? (
    <div>loading result ...</div>
  ) : (
    <div>
      <h1>{userResult.data.user.username} </h1>
      <p>{userResult.data.user.name}</p>
      <h2> Blogs</h2>
      <ul>
        {userResult.data.user.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <a href={blog.url}>
                {' '}
                {blog.title} (by {blog.author})
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserPage
