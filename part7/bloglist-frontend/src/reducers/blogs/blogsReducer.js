/* eslint-disable */
import blogService from '../../services/blogs'

const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'blogs/initializeBlogs':
      return action.payload
    case 'blogs/saveNewBlog':
      return [...state, action.payload]
    case 'blogs/likeBlog': {
      return state.map((blog) => {
        if (blog.id !== action.payload.id) {
          return blog
        }
        return {
          ...blog,
          likes: blog.likes + 1,
        }
      })
    }
    case 'blogs/deleteBlog': {
      return state.filter((blog) => blog.id !== action.payload.id)
    }
    default:
      return state
  }
}

export const initializeBlogs = async (dispatch) => {
  const response = await blogService.getAll()
  dispatch({ type: 'blogs/initializeBlogs', payload: response })
}

export const saveNewBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog)
    dispatch({ type: 'blogs/saveNewBlog', payload: response })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(blog)
    dispatch({ type: 'blogs/likeBlog', payload: likedBlog })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    // if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
    await blogService.deleteBlog(blog)
    dispatch({ type: 'blogs/deleteBlog', payload: blog })
    // }
  }
}

export default blogsReducer
