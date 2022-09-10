/* eslint-disable */

import { createStore } from 'redux'
import rootReducer from './reducer'
// export const store = createStore({ reducer: notificationReducer })
const store = createStore(rootReducer)

export default store
