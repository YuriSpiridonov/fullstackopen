const Notification = ({ errorMessage }) => {
  if (errorMessage) {
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  }
  return null;
};

export default Notification;
