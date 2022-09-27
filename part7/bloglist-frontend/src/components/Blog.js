/* eslint-disable */
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    width: '600px',
    paddingTop: 10,
    paddingLewft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
