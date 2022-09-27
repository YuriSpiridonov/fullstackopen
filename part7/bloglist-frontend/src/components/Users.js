/* eslint-disable */
import { useSelector } from 'react-redux'

import UsersList from './UsersList'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <UsersList users={users} />
    </div>
  )
}

export default Users
