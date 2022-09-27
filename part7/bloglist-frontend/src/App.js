/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

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
  const blogs = useSelector((state) => state.blogs)

  const currentUserMatch = useMatch('/users/:id')
  const currentUser = currentUserMatch
    ? users.find((user) => user._id === currentUserMatch.params.id)
    : null

  const currentBlogMatch = useMatch('/blogs/:id')
  const currentBlog = currentBlogMatch
    ? blogs.find((blog) => blog.id === currentBlogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs)
    dispatch(initializeUsers)
  }, [dispatch])

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
          <Notification />
          <NavBar />
          <h1>blog app</h1>
          <Routes>
            <Route path="/" element={<MainPageContent />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={currentUser} />} />
            <Route
              path="/blogs/:id"
              element={<BlogPage blog={currentBlog} />}
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
