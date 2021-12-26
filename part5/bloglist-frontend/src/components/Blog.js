import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLewft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setVisible] = useState(false)

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
        likes {blog.likes} <button onClick={() => null}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>
)}

export default Blog