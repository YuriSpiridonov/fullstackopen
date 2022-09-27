/* eslint-disable */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducer'

const composedEnhancer = applyMiddleware(thunkMiddleware)

const store = createStore(rootReducer, composedEnhancer)

export default store
