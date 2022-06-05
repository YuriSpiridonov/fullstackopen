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

let delayId = null

export const showNotification = (notification, delay) => async dispatch =>{
  if (delayId !== null) {
    clearTimeout(delayId)
  }
  delayId = setTimeout(() => {
    dispatch(timeoutForNotification())
  }, delay * 1000)

  return dispatch({ 
      type: 'NOTIFICATION',
      data: {
        notification,
      }
    })

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