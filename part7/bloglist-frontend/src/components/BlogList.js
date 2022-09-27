/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <table>
      <tbody>
        {sortedBlogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Blog blog={blog} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BlogList
