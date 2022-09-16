/* eslint-disable */
const initialState = { type: null, text: '' }

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'notifications/showNotification':
      return action
    case 'notifications/error':
      return action
    case 'notifications/timeout':
      return action
    default:
      return state
  }
}

export const timeoutForNotification = () => {
  return {
    type: 'notifications/timeout',
  }
}

export default notificationsReducer
