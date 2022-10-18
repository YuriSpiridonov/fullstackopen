/* eslint-disable */
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Table from 'react-bootstrap/Table'

const UsersList = () => {
  const users = useSelector((state) => state.users)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>List of Users</th>
          <th>Blogs they have posted</th>
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
    </Table>
  )
}

export default UsersList
