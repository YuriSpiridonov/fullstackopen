import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notifications)

  if (!message) {
    return null
  }

  return <div className={message.type}>{message.text}</div>
}

export default Notification
