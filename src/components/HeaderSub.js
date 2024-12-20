import React, { useState, useRef, useEffect,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context Status/AuthContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import '../Css/Wizard.css'; 

const NavItem = ({ to, onClick, children }) => (
  <Link to={to} onClick={onClick} className="nav-item-link">
    {children}
  </Link>
);

const HeaderSub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {setIsLoggedIn, setEmail  , setAccountName, setToken, token, apiUrl, setRole} = useContext(AuthContext);
  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Gắn sự kiện click vào tài liệu
    document.addEventListener('mousedown', handleClickOutside);

    // Hủy sự kiện khi component bị hủy
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const items = [
    { path: '/profile', label: 'Hồ sơ cá nhân' },
    { path: '/', label: 'Đăng xuất', onClick: () => handleLogout() },
  ];

  const Dropdown = React.forwardRef(({ title, items, isOpen, onToggle }, ref) => (
    <li className="nav-item" ref={ref} style={{ marginRight:'8px'}}>
      <div className="nav-link" onClick={onToggle}>
        {title}
        <i className="fa-solid fa-sort-down"></i>
      </div>
      {isOpen && (
        <div className="nav-item-hidden">
          {items.map((item, index) => (
            <NavItem key={index} to={item.path} onClick={item.onClick}>
              {item.label}
            </NavItem>
          ))}
        </div>
      )}
    </li>
  ));


  const getUserData = async () => {
      try {
          const response = await axios.get(`${apiUrl}/api/user`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setAccountName(response.data.data.username);
          console.log(response.data.data.username);
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
      }
  };

  useEffect(() => {
    if (token) {
        getUserData();
    }
  }, [token]);



  const handleLogout = async () => {
    try {
          const response = await axios.post(`${apiUrl}/api/auth/logout`, {}, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });

          if (response.status === 200) {
              console.log('Logout successful');
              // Xóa trạng thái đăng nhập khỏi localStorage
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('AccountName');
              setAccountName("");
              setToken("");
              setIsLoggedIn(false);
              setEmail('');              
          } else {
              console.log('Logout failed');
          }
      } catch (error) {
          console.error('Error during logout:', error);
      }
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (token) {
        try {
              const decodedToken = jwtDecode(token);
              const currentTime = Date.now() / 1000; 

              if (decodedToken.exp < currentTime) {
                  console.log("Token đã hết hạn");
                  localStorage.removeItem('token');
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('email');
                  localStorage.removeItem('role');
                  setAccountName("");
                  setToken("");
                  setIsLoggedIn(false);
                  setEmail('');
                  setRole("");
                  // navigate('/');
              } else {
                  console.log("Token còn hiệu lực");
              }
          } catch (error) {
              console.error('Lỗi khi giải mã token:', error);
          }
      } else {
          console.log("Không có token");
      }
  }, []); 
  return (
    <div id="navigationUserWrapper">
      <div className="left-group">
        <header className="nav-item">
          <Link to="/">Tạp chí Khoa Học và Công Nghệ Cần Thơ</Link>
        </header>
      </div>

      <div className="right-group">
      {role === '4' && (
      <Link
        to="/subs"
        className="nav-item right-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          textAlign: 'center',
          gap: '5px',
        }}
      >
        <span className="fa fa-eye"></span>
        Xem các bài báo
      </Link>
      )}
      
      {role === '3' && (
        <Link
          to="/reviewer"
          className="nav-item right-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            textAlign: 'center',
            gap: '5px',
          }}
        >
          <i class="fa fa-edit"></i>
          Phản biện viên
        </Link>
      )}

      {role === '2' && (
        <Link
          to="/boardoftrustees"
          className="nav-item right-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            textAlign: 'center',
            gap: '5px',
          }}
        >
          <i class="fa-solid fa-clipboard"></i>
          Ban trị sự
        </Link>
      )}

      {role === '1' && (
        <>
        <Link
          to="/editorialboard/assignment"
          className="nav-item right-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            textAlign: 'center',
            gap: '5px',
          }}
        >
          <i class="fa-solid fa-tag"></i>
          Phân công
        </Link>
        <Link
          to="/editorialboard"
          className="nav-item right-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            textAlign: 'center',
            gap: '5px',
          }}
        >
          <i class="fa-solid fa-database"></i>
          Bảng điều khiển
        </Link>
        </>
      )}



        <Dropdown
          title={
            <div className="nav-link" style={{ display: 'inline', alignItems: 'center', flexWrap: 'nowrap', marginRight: '5px' }}>
              <i className="fa-solid fa-user"></i>
              <span style={{ marginRight: '6px' }}></span>
              {email}
              <span className="badge">0</span>
            </div>
          }
          items={items}
          isOpen={isOpen}
          onToggle={toggleDropdown}
          ref={dropdownRef}
        />
      </div>
    </div>
  );
};

export function SlideBar() {
  return (
    <div className="pkp_structure_coldum">
      <img src="/ass/img/logo.png" alt="Logo" />
      <Link to="/archiving" className="">
        <span style={{ marginRight: '4px' }}>
          <i className="fa-solid fa-box"></i>
        </span>
        Các bài báo
      </Link>
      <div className="pkp_structure_coldum_news ">
        <h4></h4>
        <div className="list_pkp_card_news">
          <div className="pkp_card_news">
            <span></span>
          </div>

          <div className="pkp_card_news">
            <span></span>
          </div>
        </div>
      </div>
    </div>


  );
}

export default HeaderSub;
