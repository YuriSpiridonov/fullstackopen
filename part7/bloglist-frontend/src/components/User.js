/* eslint-disable */
import Blog from './Blog'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <table>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog blog={blog} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User
