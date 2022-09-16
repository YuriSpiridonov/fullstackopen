/* eslint-disable */

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducer'
// export const store = createStore({ reducer: notificationReducer })

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const composedEnhancer = applyMiddleware(thunkMiddleware)

const store = createStore(rootReducer, composedEnhancer)

export default store
