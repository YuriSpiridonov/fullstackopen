import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleBlogDelete, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLewft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [isVisible, setVisible] = useState(false)

  const deleteButton = () => {
    if (blog.user.username === loggedUser) {
      return (
        <button id="delete" onClick={() => handleBlogDelete()}>
          delete
        </button>
      )
    }
  }

  if (!isVisible) {
    return (
      <div style={blogStyle} className="shortBlogInfo">
        <div>
          {blog.title} {blog.author}
          <button id="view" onClick={() => setVisible(true)}>
            view
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(false)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}{' '}
        <button id="like" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      <div>{deleteButton()}</div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired,
}

export default Blog
