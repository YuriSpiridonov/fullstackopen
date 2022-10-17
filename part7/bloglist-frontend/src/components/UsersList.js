/* eslint-disable */
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersList = () => {
  const users = useSelector((state) => state.users)
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>
              <Link to={`/users/${user._id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersList
