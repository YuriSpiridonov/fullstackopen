/* eslint-disable */
import loginService from '../../services/login'
import blogService from '../../services/blogs'

const loggedUserJSON = JSON.parse(
  window.localStorage.getItem('loggedBlogappUser'),
)
const initialState = loggedUserJSON ? loggedUserJSON : null
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login/userLogin':
      return action.payload
    case 'login/userLogout':
      return null
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({ type: 'login/userLogin', payload: user })
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBloglistUser')
  return dispatch({
    type: 'login/userLogout',
  })
}

export default loginReducer
