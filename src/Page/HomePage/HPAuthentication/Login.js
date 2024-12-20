import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
import { AuthContext } from '../../../Context Status/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  
  const { setIsLoggedIn, setEmail, setToken, setRole , apiUrl,token,role} = useContext(AuthContext);
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedLoggedIn === 'true' && storedEmail) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
      setToken(storedToken); 
      setRole(storedRole);
    }
  }, [setIsLoggedIn, setEmail, setToken,setRole]);


  

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        login: username, 
        password: password,
      });
      if (response.data.status === 200) {
        alert("Đăng nhập thành công!");
        setIsLoggedIn(true);
        setEmail(username); 
        setToken(response.data.token);
        setRole(response.data.role);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', username); 
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('role',response.data.role);
        navigate('/');
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Mất kết nối với server');
      }
    }
  };
  
  

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };


  return (
    <div>
      <Banner
        isLoggedIn={false} // Bạn có thể điều chỉnh giá trị này tùy theo trạng thái đăng nhập
        userEmail={null} // Có thể để null nếu chưa đăng nhập
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
              <Link to={"/Forgetpass"} className="forgot-password">Quên mật khẩu?</Link>
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
