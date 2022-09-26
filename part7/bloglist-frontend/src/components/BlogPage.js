/* eslint-disable */
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogs/blogsReducer'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedUser = useSelector((state) => state.loggedinUser)

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleBlogDelete = (blog) => {
    // console.log('delete blog ', blog)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const deleteButton = () => {
    // console.log(
    //   'blog user name',
    //   blog.user.username,
    //   ' logged user ',
    //   loggedUser,
    // )
    if (blog.user.username === loggedUser.username) {
      return (
        <button id="delete" onClick={() => handleBlogDelete(blog)}>
          delete
        </button>
      )
    }
  }

  return (
    <div>
      <div>
        <h2>
          {blog.title} {blog.author}{' '}
        </h2>
        {/* <button onClick={() => setVisible(false)}>hide</button> */}
      </div>
      <div>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </div>
      <div>
        likes {blog.likes}{' '}
        <button id="like" onClick={handleLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <div>{deleteButton()}</div>
    </div>
  )
}

export default BlogPage
