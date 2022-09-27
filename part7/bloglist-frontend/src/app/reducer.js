/* eslint-disable */
import { combineReducers } from 'redux'

import notificationsReducer from '../reducers/notifications/notificationsReducer'
import blogsReducer from '../reducers/blogs/blogsReducer'
import loginReducer from '../reducers/login/loginReducer'
import usersReducer from '../reducers/users/usersReducer'

export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  blogs: blogsReducer,
  loggedinUser: loginReducer,
  users: usersReducer,
})

export default rootReducer
