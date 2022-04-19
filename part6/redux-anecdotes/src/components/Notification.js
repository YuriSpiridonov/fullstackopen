import React from 'react'
// import { useSelector } from 'react-redux' // hook
import { connect } from 'react-redux' // connwect

// const Notification = () => { // hook
const Notification = (props) => { // connect

  // const notification = useSelector(state => state.notification) // hook
  const notification = props.notification // connect
  console.log(`    notification ${notification}`)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {notification && (
        <div style={style}>
          {notification}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => { // v connect
  return  {
    notification: state.notification
  }
} // ^ connect

// export default Notification // hook
const ConnectedNotification = connect(mapStateToProps)(Notification) // v connect
export default ConnectedNotification // ^ connect