/* eslint-disable */

import { combineReducers } from 'redux'

import notificationReducer from '../reducers/notification/notificationReducer'
// export const store = createStore({ reducer: notificationReducer })
export const rootReducer = combineReducers({
  notification: notificationReducer,
})

export default rootReducer
