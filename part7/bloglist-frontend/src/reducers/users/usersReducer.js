/* eslint-disable */
import usersService from '../../services/users'

const initialState = []

const usersReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'users/initializeUsers':
      return action.payload
    default:
      return state
  }
}

export const initializeUsers = async (dispatch) => {
  const response = await usersService.getUsers()
  dispatch({ type: 'users/initializeUsers', payload: response })
}

export default usersReduser
