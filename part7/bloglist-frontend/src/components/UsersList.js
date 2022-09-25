/* eslint-disable */

import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

// import User from './User'

const UsersList = ({ users }) => {
  // const dispatch = useDispatch()
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
              {/* <a href={user._id}>{user.name}</a> */}
              {/* state={dispatch(user._id)} */}
              <Link to={`/users/${user._id}`}>{user.name}</Link>
              {/* <User user={user} /> */}
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersList
