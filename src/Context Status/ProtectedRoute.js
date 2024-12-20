import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import LoadingComponent from "../components/loading"

const ProtectedRoute = ({ children, requiredRoles  }) => {
  const { isLoggedIn, token, role } = useContext(AuthContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);


  const storedLogin = localStorage.getItem('isLoggedIn');
  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');
  
  useEffect(() => {
    // Delay ngắn để đảm bảo dữ liệu đã được load
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100); // Điều chỉnh thời gian nếu cần

    return () => clearTimeout(timer); // Dọn sạch timer khi component unmount
  }, []);
  useEffect(() =>{
    console.log('isLoggedIn:', isLoggedIn);
    console.log('token:', token);
    console.log('userRole:', role);
  });

  
  if (isCheckingAuth) {
    return (
      <LoadingComponent/>
    );
  }

  

  // Kiểm tra nếu người dùng đã đăng nhập và có quyền hợp lệ
  if (storedToken && storedLogin) {
    // Kiểm tra quyền truy cập (role)
    if (requiredRoles && requiredRoles.includes(storedRole)) {
      return children; // Nếu người dùng có quyền hợp lệ, cho phép truy cập
    } else {
      return <Navigate to="/" replace />; // Nếu không có quyền, điều hướng đến trang không có quyền truy cập (ví dụ: Forbidden)
    }
  } else {
    return <Navigate to="/login" replace />; // Nếu không đăng nhập, điều hướng về trang đăng nhập
  }
};

export default ProtectedRoute;
