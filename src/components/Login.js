import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Fooster from './Fooster';
import Banner from './Banner';
import { AuthContext } from '../AuthContext'; // Sửa import AuthContext

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, email, setEmail } = useContext(AuthContext); // Lấy giá trị từ AuthContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        console.log("User data:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError('Không thể tải dữ liệu người dùng');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Array.isArray(userData) || userData.length === 0) {
      setError('Dữ liệu người dùng chưa được tải. Vui lòng thử lại sau.');
      return;
    }

    try {
      const user = userData.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        alert("Đăng nhập thành công!");
        setIsLoggedIn(true);
        setEmail(user.email);
        navigate('/');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError('Math error');
    }
  };

  useEffect(() => {
    console.log("User logged in:", isLoggedIn);
    console.log("User email:", email);
  }, [isLoggedIn, email]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div>
      <Banner
        isLoggedIn={isLoggedIn}
        userEmail={email}
        toggleUserMenu={toggleUserMenu}
        isUserMenuOpen={isUserMenuOpen}
      />
      <div className="layout-login">
        <div className="login-container">
          <h2>Đăng Nhập</h2>
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="input-group">
              <label htmlFor="username">Tên tài khoản / Địa chỉ email</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="options">
              <div className="checkbox-group">
                <input type="checkbox" id="remember-me" name="remember-me" />
                <label htmlFor="remember-me">Giữ đăng nhập</label>
              </div>
              <a href="Forget-pass.html" className="forgot-password">Quên mật khẩu?</a>
            </div>
            <button type="submit" className="login-btn">Đăng Nhập</button>
          </form>
        </div>
      </div>
      <Fooster />
    </div>
  );
};

export default Login;
