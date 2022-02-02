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

export const showNotification = notification => {
  return {
    type: 'NOTIFICATION',
    data: {
      notification,
    }
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