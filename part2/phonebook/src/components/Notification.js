import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div className={notification.type}>
            {notification.text}
        </div>
    )
}

export default Notification
