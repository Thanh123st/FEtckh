import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // Nếu chưa đăng nhập, chuyển hướng đến trang login
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập, render các children (các trang được bảo vệ)
  return children;
};

export default ProtectedRoute;
