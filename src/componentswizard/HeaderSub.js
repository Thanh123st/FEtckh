import React, { useState, useRef, useEffect,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

import './Wizard.css';

const NavItem = ({ to, onClick, children }) => (
  <Link to={to} onClick={onClick} className="nav-item-link">
    {children}
  </Link>
);

const HeaderSub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, email ,setIsLoggedIn, setEmail} = useContext(AuthContext);
  const navigate = useNavigate();

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
    <li className="nav-item" ref={ref}>
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

  const handleLogout = () => {
    // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    
    // Cập nhật trạng thái trong AuthContext
    setIsLoggedIn(false);
    setEmail('');
    alert("Đăng xuất thành công");
    // Điều hướng người dùng đến trang đăng nhập
    navigate('/');
  };
  return (
    <div id="navigationUserWrapper">
      <div className="left-group">
        <header className="nav-item">
          <Link to="/">Tạp chí khoa học Trường đại học kỹ thuật - công nghệ Cần Thơ</Link>
        </header>

        <div className="nav-item">
          <div className="nav-link">
            <Link to="">Công việc</Link>
          </div>
        </div>
      </div>

      <div className="right-group">
        <Link
          to="/"
          className="nav-item right-group"
          style={{
            display: 'flex',
            alignItems: 'center', // Căn giữa theo chiều dọc
            justifyContent: 'center', // Căn giữa theo chiều ngang
            textAlign: 'center', // Căn giữa văn bản
            gap: '5px',
          }}
        >
          <span className="fa fa-eye"></span>
          Xem trang
        </Link>

        <Dropdown
          title={
            <div className="nav-link" style={{ display: 'inline', alignItems: 'center', flexWrap: 'nowrap' }}>
              <i className="fa-solid fa-user"></i>
              <span style={{ marginRight: '4px' }}></span>
              khachhang@gmail.com
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
      <Link to="/Subs" className="">
        <span style={{ marginRight: '4px' }}>
          <i className="fa-solid fa-box"></i>
        </span>
        Các bài báo
      </Link>
    </div>
  );
}

export default HeaderSub;
