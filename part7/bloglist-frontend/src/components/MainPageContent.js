/* eslint-disable */
import { useDispatch } from 'react-redux'
import React, { useRef } from 'react'

import Togglable from './Togglable'
import PostForm from './PostForm'
import BlogList from './BlogList'

import { saveNewBlog } from '../reducers/blogs/blogsReducer'

const MainPageContent = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      const notification = {
        type: 'notifications/error',
        text: 'You are missing one of the following: Blog title, blog author or link for the website.',
      }
      dispatch(notification)
      setTimeout(() => {
        dispatch({ type: 'notifications/timeout', text: '' })
      }, 5000)
      return null
    }
    dispatch(saveNewBlog(newBlog))

    const notification = {
      type: 'notifications/showNotification',
      text: `${newBlog.title} by ${newBlog.author} added`,
    }
    dispatch(notification)
    setTimeout(() => {
      dispatch({ type: 'notifications/timeout', text: '' })
    }, 5000)
  }

  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <PostForm handleNewBlog={handleNewBlog} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default MainPageContent
