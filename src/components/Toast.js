// Toast.js
import React, { useEffect } from 'react';

const Toast = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, [duration, onClose]);

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__message">{message}</div>
      <button className="toast__close-btn" onClick={onClose}>✖</button>
    </div>
  );
};

export default Toast;

