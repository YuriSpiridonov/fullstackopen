/* eslint-disable */
import Blog from './Blog'

import Table from 'react-bootstrap/Table'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <Table striped bordered hover>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog blog={blog} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User
