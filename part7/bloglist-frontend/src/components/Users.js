/* eslint-disable */
import { useSelector } from 'react-redux'

import User from './User'

// import usersReducer from '../reducers/users/usersReducer'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <User users={users} />
    </div>
  )
}

export default Users
