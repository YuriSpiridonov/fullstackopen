/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const message = useSelector((state) => state.notifications)

  switch (message.type) {
    case 'notifications/showNotification':
      return (
        <Alert key={'success'} variant={'success'}>
          {message.text}
        </Alert>
      )
    case 'notifications/error':
      return (
        <Alert key={'warning'} variant={'warning'}>
          {message.text}
        </Alert>
      )
  }

  return null
}

export default Notification
