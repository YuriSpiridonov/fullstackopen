/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import MainPageContent from './components/MainPageContent'
import User from './components/User'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogs/blogsReducer'
import { initializeUsers } from './reducers/users/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.loggedinUser)
  const users = useSelector((state) => state.users)

  const currentUserMatch = useMatch('/users/:id')
  // console.log('currentUserMatch ', currentUserMatch)
  const currentUser = currentUserMatch
    ? users.find((user) => user._id === currentUserMatch.params.id)
    : null
  // console.log('currentUser ', currentUser)

  useEffect(() => {
    dispatch(initializeBlogs)
    dispatch(initializeUsers)
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
          <Routes>
            <Route path="/users/:id" element={<User user={currentUser} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<MainPageContent />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
