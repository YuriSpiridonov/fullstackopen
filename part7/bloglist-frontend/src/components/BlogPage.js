/* eslint-disable */
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CommentForm from './CommentForm'
import Comment from './Comment'

import {
  likeBlog,
  deleteBlog,
  saveNewComment,
} from '../reducers/blogs/blogsReducer'

import { Button } from 'react-bootstrap'

const BlogPage = () => {
  const blogs = useSelector((state) => state.blogs)
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedUser = useSelector((state) => state.loggedinUser)

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleBlogDelete = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const deleteButton = () => {
    if (blog.user.username === loggedUser.username) {
      return (
        <Button
          id="delete"
          onClick={() => handleBlogDelete(blog)}
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      )
    }
  }

  const handleNewComment = async (newComment) => {
    if (!newComment.comment) {
      const notification = {
        type: 'notifications/error',
        text: 'You are missing your comment.',
      }
      dispatch(notification)
      setTimeout(() => {
        dispatch({ type: 'notifications/timeout', text: '' })
      }, 5000)
      return null
    }
    dispatch(saveNewComment(blog.id, newComment))

    const notification = {
      type: 'notifications/showNotification',
      text: `${newComment.comment}  added`,
    }
    dispatch(notification)
    setTimeout(() => {
      dispatch({ type: 'notifications/timeout', text: '' })
    }, 5000)
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div>
        <h2>
          {blog.title} {blog.author}{' '}
        </h2>
      </div>
      <div>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </div>
      <div>
        likes {blog.likes}{' '}
        <Button
          id="like"
          onClick={handleLike}
          variant="outline-info"
          size="sm"
          type="submit"
        >
          Like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      <div>{deleteButton()}</div>
      <div className="mt-5">
        <h3>Comments</h3>
        <CommentForm handleNewComment={handleNewComment} />
        <Comment />
      </div>
    </div>
  )
}

export default BlogPage
