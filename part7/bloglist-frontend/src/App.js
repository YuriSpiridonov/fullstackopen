/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import MainPageContent from './components/MainPageContent'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogs/blogsReducer'
import { initializeUsers } from './reducers/users/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.loggedinUser)

  useEffect(() => {
    dispatch(initializeBlogs)
    dispatch(initializeUsers)
  }, [dispatch])

  // const match = useMatch('/users')

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
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<MainPageContent />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
