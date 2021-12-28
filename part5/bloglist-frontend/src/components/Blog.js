import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleBlogDelete, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLewft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setVisible] = useState(false)

  const deleteButton = () => {   
    if (blog.user.username === loggedUser) {
      return (
        <button onClick={() => handleBlogDelete()}>delete</button>
      )
    }
  }

  if (!isVisible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      </div> 
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        {deleteButton()}
      </div>
    </div>
)}

export default Blog