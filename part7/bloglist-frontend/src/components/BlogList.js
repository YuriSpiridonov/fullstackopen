import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './Blog'

import { likeBlog, deleteBlog } from '../reducers/blogs/blogsReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }
  const handleBlogDelete = (blog) => dispatch(deleteBlog(blog))

  const loggedUser = useSelector((state) => state.loggedinUser)
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleBlogDelete={() => handleBlogDelete(blog)}
          loggedUser={loggedUser}
        />
      ))}
    </div>
  )
}

export default BlogList
