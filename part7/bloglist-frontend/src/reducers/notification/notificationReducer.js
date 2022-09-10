/* eslint-disable */
// import configuteStore from "redux";
import { useDispatch } from 'react-redux'

// import Notification from './components/Notification'

const initialState = { type: null, text: '' }

const notificationReducer = (state = initialState, action) => {
  //initialState
  console.log('action: ', action)
  switch (action.type) {
    case 'notification/showNotification':
      // console.log(action.data.text)
      // const notification = () => action.data.text
      // state = inintailState
      console.log('notif: ', action.text, action.type)
      return action
    // return showNotification(action, 5)
    case 'notification/error':
      // const error = () => action.data.text
      // state = inintailState
      console.log('error: ', action.text, action.type)
      return action //error
    case 'notification/timeout':
      // state = inintailState
      return action
    default:
      return state
  }
}

// export const showNotification = (notification, delay) => {
//   // const dispatch = useDispatch()
//   const { type, text } = notification
//   console.log(type, text)

// store.dispatch(notification)
// return {
//   type: type, //'notification/showNotification',
//   data: {
//     text,
//     delay,
//     // delay: setTimeout(() => {
//     //   dispatch(timeoutForNotification())
//     // }, delay * 1000),
//   },
// }
// return async (dispatch) => {
//   dispatch({
//     type, //'notification/showNotification',
//     data: {
//       text,
//       delay: setTimeout(() => {
//         dispatch(timeoutForNotification())
//       }, delay * 1000),
//     },
//   })
// }
// }

export const timeoutForNotification = () => {
  return {
    type: 'notification/timeout',
  }
}

// export const store = configuteStore({ reducer: notificationReducer });

export default notificationReducer
