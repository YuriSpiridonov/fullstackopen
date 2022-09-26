/* eslint-disable */

import React from 'react'
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './Blog'

// import { likeBlog, deleteBlog } from '../reducers/blogs/blogsReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  // const handleLike = async (blog) => {
  //   dispatch(likeBlog(blog))
  // }
  // const handleBlogDelete = (blog) => dispatch(deleteBlog(blog))

  // const loggedUser = useSelector((state) => state.loggedinUser)
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

// <Blog
//   key={blog.id}
//   blog={blog}
//   handleLike={() => handleLike(blog)}
//   handleBlogDelete={() => handleBlogDelete(blog)}
//   loggedUser={loggedUser}
// />

export default BlogList
