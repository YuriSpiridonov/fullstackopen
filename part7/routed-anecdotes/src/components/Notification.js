const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <div>{notification}</div>
  )
}

export default Notification