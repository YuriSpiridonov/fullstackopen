import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PostForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')

    // if (!blogObject.title || !blogObject.author || !blogObject.url) {
    //   setTitle('')
    //   setAuthor('')
    //   setUrl('')
    //   setNotification({
    //     text: 'You are missing one of the following: Blog title, blog author or link for the website.',
    //     type: 'error'
    //   })
    //   setTimeout(() => {
    //     setNotification(null)
    //   }, 5000)
    //   return null
    // }
  }

  return (
    <div>
      <form id='form' onSubmit={handleSubmit}>
        <label>
          <p>
            Title:
            <input
              id='title'
              type='text'
              value={title}
              name='Title:'
              onChange={handleTitleChange}
            />
          </p>
        </label>
        <label>
          <p>
            Author:
            <input
              id='author'
              type='text'
              value={author}
              name="Author:"
              onChange={handleAuthorChange}
            />
          </p>
        </label>
        <label>
          <p>
            Url:
            <input
              id='url'
              type='text'
              value={url}
              name="Url:"
              onChange={handleUrlChange}
            />
          </p>
        </label>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  // handleTitleChange: PropTypes.func.isRequired,
  // handleAuthorChange: PropTypes.func.isRequired,
  // handleUrlChange: PropTypes.func.isRequired,
  // title: PropTypes.string.isRequired,
  // author: PropTypes.string.isRequired,
  // url: PropTypes.string.isRequired
}

export default PostForm
