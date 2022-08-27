import React from "react";

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className={message.type}>{message.text}</div>;
};

export default Notification;
