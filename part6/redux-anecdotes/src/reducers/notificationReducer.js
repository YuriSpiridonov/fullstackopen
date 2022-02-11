const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data.notification
    case 'TIMEOUT':
      return action.data.notification
    default:
      return state
  }
}

export const showNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch({ 
      type: 'NOTIFICATION',
      data: {
        notification,
        delay: setTimeout(() => {
          dispatch(timeoutForNotification())
        }, delay * 1000)
      }
    })

  }
}

export const timeoutForNotification = () => {
  return {
    type: 'TIMEOUT',
    data: {
      notification: ''
    }
  }
}

export default notificationReducer