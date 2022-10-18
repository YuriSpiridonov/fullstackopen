/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import MainPageContent from './components/MainPageContent'
import User from './components/User'
import Users from './components/Users'
import BlogPage from './components/BlogPage'
import NavBar from './components/NavBar'

import { initializeBlogs } from './reducers/blogs/blogsReducer'
import { initializeUsers } from './reducers/users/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.loggedinUser)
  const users = useSelector((state) => state.users)

  const currentUserMatch = useMatch('/users/:id')
  const currentUser = currentUserMatch
    ? users.find((user) => user._id === currentUserMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs)
    dispatch(initializeUsers)
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser'),
    )
    if (loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user?.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])

  return (
    <div className="container">
      {!user ? (
        <div>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <NavBar />
          <Notification />
          <h1>Blog App</h1>
          <Routes>
            <Route path="/" element={<MainPageContent />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={currentUser} />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
