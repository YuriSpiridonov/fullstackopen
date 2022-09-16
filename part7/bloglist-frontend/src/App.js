/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import MainPageContent from './components/MainPageContent'

import { initializeBlogs } from './reducers/blogs/blogsReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.loggedinUser)

  useEffect(() => {
    dispatch(initializeBlogs)
  }, [dispatch])

  const handleLogout = () => {
    dispatch({ type: 'login/userLogout' })
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <h1>blogs</h1>
          <Notification />
          <p>
            {user.name} logged in{' '}
            <button id="logout" onClick={handleLogout}>
              logout
            </button>
          </p>
          <MainPageContent />
        </div>
      )}
    </div>
  )
}

export default App
