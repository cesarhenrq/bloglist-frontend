import React from "react";

const Notification = ({ notification }) => {
  return (
    notification && (
      <div className={notification.error ? "error" : "success"}>
        {notification.message}
      </div>
    )
  );
};

export default Notification;
