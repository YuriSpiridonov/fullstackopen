import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import PostForm from './components/PostForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const postFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: author,
      url: url,
      user: user.name,
      likes: 0
    }

    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      setNewBlog('')
      setAuthor('')
      setUrl('')
      setNotification({
        text: 'You are missing one of the following: Blog title, blog author or link for the website.',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return null
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setAuthor('')
        setUrl('')
        setNotification({
          text: `${blogObject.title} by ${blogObject.author} added`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleLike = async (blog) => {
    const likedBlog = await blogService.like(blog)
    setBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id
          ? { ...blog, likes: likedBlog.likes }
          : blog
      )
    )
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      setBlogs(
        blogs.filter(currnetBlog => currnetBlog.id !== blog.id)
      )
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setNotification({
        text: 'wrong credentials',
        type: 'error',
      })
      console.log(exception)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <BlogList
      blogs={blogs.sort((a, b) => b.likes - a.likes)}
      handleLike={handleLike}
      handleBlogDelete={handleBlogDelete}
      loggedUser={user.username}
    />
  )

  const postForm = () => (
    <Togglable buttonLabel='create new blog' ref={postFormRef}>
      <PostForm
        title={newBlog}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setNewBlog(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={handleNewBlog}
      />
    </Togglable>
  )

  return (
    <div>
      {user === null ?
        <div>
          <h1>log in to application</h1>
          <Notification message={notification} />
          {loginForm()}
        </div> :
        <div>
          <h1>blogs</h1>
          <Notification message={notification} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {postForm()}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App