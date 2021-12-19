import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: author,
      url: url,
      user: user.name,
      likes: likes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setAuthor('')
        setUrl('')
      })
  }

  // const handleBlogChange = (event) => {
  //   console.log(event.target.value)
  //   setNewBlog(event.target.value)
  // }

  // const handleAuthorChange = (event) => {
  //   console.log(event.target.value)
  //   setAuthor(event.target.value)
  // }

  // const handleUrlChange = (event) => {
  //   console.log(event.target.value)
  //   setUrl(event.target.value)
  // }

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
      setErrorMessage('wrong credentials')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>    
  )

  const postForm = () => {
    return (
      <div>
        <form onSubmit={addBlog}>
          <label> 
            <p>
              Title:
              <input
                type='text'
                value={newBlog}
                name='Title:'
                onChange={({ target }) => setNewBlog(target.value)} // {handleBlogChange}
              />
            </p>
          </label>
          <label> 
            <p>
              Author:
              <input
                type='text'
                value={author}
                name="Author:"
                onChange={({ target }) => setAuthor(target.value)} // {handleAuthorChange}
              />
            </p>
          </label>
          <label>
            <p>
              Url:
              <input
                type='text'
                value={url}
                name="Url:"
                onChange={({ target }) => setUrl(target.value)} // {handleUrlChange}
              />
            </p>
          </label>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        <div>
          <h1>log in to application</h1>
          {loginForm()}
        </div> :
        <div>
          <h1>blogs</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {postForm()}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App