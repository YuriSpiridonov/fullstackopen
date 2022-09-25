/* eslint-disable */
import usersService from '../../services/users'

// import store from '../../app/store'
// console.log('store ', store)
// const users = store.users

const initialState = [] //() => (users ? users : [])

const usersReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'users/initializeUsers':
      return action.payload
    case 'users/initializeCurrentUser':
      console.log('reached!!!!')
    // console.log(state, store)
    // state.filter((user) => {
    //   if (user._id === action.payload) {
    //     console.log('user info: ', user)
    //     return user // return { user.name, user.blogs }
    //   }
    // })
    default:
      return state
  }
}

// case 'blogs/likeBlog': {
//   return state.map((blog) => {
//     if (blog.id !== action.payload.id) {
//       return blog
//     }
//     return {
//       ...blog,
//       likes: blog.likes + 1,
//     }

export const initializeUsers = async (dispatch) => {
  const response = await usersService.getUsers()
  dispatch({ type: 'users/initializeUsers', payload: response })
}

// export const loginUser = (username, password) => {
//   return async (dispatch) => {
// export const initializeCurrentUser = (id) => {
//   return async (dispatch) => {
//     const response = await usersService.getCurrentUser(id)
//     dispatch({ type: 'users/initializeCurrentUser', payload: response })
//   }
// }

export default usersReduser
