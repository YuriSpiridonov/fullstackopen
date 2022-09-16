/* eslint-disable */

import { combineReducers } from 'redux'

import notificationsReducer from '../reducers/notifications/notificationsReducer'
import blogsReducer from '../reducers/blogs/blogsReducer'
import loginReducer from '../reducers/login/loginReducer'
// export const store = createStore({ reducer: notificationReducer })
export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  blogs: blogsReducer,
  loggedinUser: loginReducer,
})

export default rootReducer
