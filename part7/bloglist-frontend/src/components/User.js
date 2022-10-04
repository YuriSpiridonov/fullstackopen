/* eslint-disable */
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const User = ({ user }) => {
  // const User = () => {
  //   const { _id } = useParams()
  //   const users = useSelector((state) => state.users)
  //   const user = users.find((user) => user.id === _id)

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
