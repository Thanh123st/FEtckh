import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context Status/AuthContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const NavItem = ({ to, onClick, children }) => (
  <Link to={to} className="nav-link" onClick={onClick}>
    {children}
  </Link>
);

const Dropdown = React.forwardRef(({ title, items, isOpen, onToggle }, ref) => (
  <li className="nav-item" ref={ref}>
    <div className="nav-link" onClick={onToggle}>
      <span>{title}</span>
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

const Banner = () => {

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn ,setIsLoggedIn, setEmail,token , setToken , apiUrl , accountName, setAccountName, role, setRole } = useContext(AuthContext);


  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Hàm đóng dropdown khi click bên ngoài
  const handleClickOutside = (event) => {
    if (
      dropdownRef1.current && !dropdownRef1.current.contains(event.target) &&
      dropdownRef2.current && !dropdownRef2.current.contains(event.target) &&
      dropdownRef3.current && !dropdownRef3.current.contains(event.target)
    ) {
      setOpenDropdown(null);
    }
  };

  const email = localStorage.getItem("email");
  setAccountName(email);

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
              localStorage.removeItem('email');
              localStorage.removeItem('role');

              // Cập nhật trạng thái trong AuthContext
              setAccountName("");
              setToken("");
              setIsLoggedIn(false);
              setEmail("");
              setRole("");
              // Điều hướng người dùng đến trang đăng nhập
              navigate('/');
          } else {
              console.log('Logout failed');
          }
      } catch (error) {
          console.error('Error during logout:', error);
      }
  };

  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownItemsIntro = [
    { label: 'Mục đích và phạm vi của tạp chí', path: '/purpose-scope', onClick: () => setOpenDropdown(null) },
    { label: 'Tần suất xuất bản', path: '/pub-freq', onClick: () => setOpenDropdown(null) },
    { label: 'Biên tập và đạo đức xuất bản', path: '/edit-ethics', onClick: () => setOpenDropdown(null) },
    { label: 'Chính sách chung và các nguyên tắc', path: '/policies-principles', onClick: () => setOpenDropdown(null) },
    { label: 'Tài trợ tạp chí', path: '/sponsorship', onClick: () => setOpenDropdown(null) },
  ];

  const dropdownItemsGuide = [
    { label: 'Hướng dẫn tác giả', path: '/auth-guidelines', onClick: () => setOpenDropdown(null) },
    { label: 'Hướng dẫn phản biện', path: '/rev-guidelines', onClick: () => setOpenDropdown(null) },
  ];

  const dropdownItemsAcc = [
    { label: 'Quản lý bài viết', path: '/subs', onClick: () => setOpenDropdown(null), role: "4" },
    { label: 'Phản biện bài viết', path: '/reviewer', onClick: () => setOpenDropdown(null), role: "3" },
    { label: 'Ban trị sự', path: '/boardoftrustees', onClick: () => setOpenDropdown(null), role: "2" },
    { label: 'Ban biên tập', path: '/editorialboard', onClick: () => setOpenDropdown(null), role: "1" },
    { label: 'Hồ sơ cá nhân', path: '/profile', onClick: () => setOpenDropdown(null) },
    { label: 'Đăng xuất', path: '/', onClick: () => {setOpenDropdown(null);handleLogout(); }},
  ];
  
  let filteredDropdownItems = [];

  if (role === "4") {
    filteredDropdownItems = dropdownItemsAcc.filter(item => item.role === undefined || item.role === "4");
  } else if (role === "3") {
    filteredDropdownItems = dropdownItemsAcc.filter(item => item.role === undefined || item.role === "3");
  } else if (role == "2") {
    filteredDropdownItems = dropdownItemsAcc.filter(item => item.role === undefined || item.role == "2");
  } else if (role == "1") {
    filteredDropdownItems = dropdownItemsAcc.filter(item => item.role === undefined || item.role == "1");
  } else {
    filteredDropdownItems = dropdownItemsAcc.filter(item => item.role === undefined);
  }


  useEffect(() =>{
    console.log(token);
    console.log(isLoggedIn);
  });


  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    if (token) {
        try {
              const decodedToken = jwtDecode(token);
              const currentTime = Date.now() / 1000; 

              if (decodedToken.exp < currentTime) {
                  console.log("Token đã hết hạn");
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('email');
                  setAccountName("");
                  setToken("");
                  setIsLoggedIn(false);
                  setEmail('');
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
    <div className="Banner">
      <header>
        <img src="/ass/img/CTUET_banner.png" alt="Banner" />
      </header>
      <div className="Navigation">
        <button className="nav-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavItem to="/" onClick={() => setIsMenuOpen(false)}>
              <i className="fa fa-home" id="home-icon"></i>
            </NavItem>
          </li>
          <Dropdown
            title="Giới thiệu"
            items={dropdownItemsIntro}
            isOpen={openDropdown === 2}
            onToggle={() => toggleDropdown(2)}
            ref={dropdownRef1}
          />
          <Dropdown
            title="Hướng dẫn"
            items={dropdownItemsGuide}
            isOpen={openDropdown === 1}
            onToggle={() => toggleDropdown(1)}
            ref={dropdownRef2}
          />
          <li className="nav-item">
            <NavItem to="/edit" onClick={() => setIsMenuOpen(false)}>Biên tập</NavItem>
          </li>
          <li className="nav-item">
            <NavItem to="/archiving" onClick={() => setIsMenuOpen(false)}>Lưu trữ</NavItem>
          </li>
          <li className="nav-item">
            <NavItem to="/submission" onClick={() => setIsMenuOpen(false)}>Gửi bài</NavItem>
          </li>
          
          {isLoggedIn ? (
            <Dropdown
              title={accountName}
              items={filteredDropdownItems}
              isOpen={openDropdown === 3}
              onToggle={() => toggleDropdown(3)}
              ref={dropdownRef3}
            />
          ) : (
            <>
            <li className="nav-item">
              <NavItem to="/login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</NavItem>
            </li>
            <li className="nav-item">
              <NavItem to="/register" onClick={() => setIsMenuOpen(false)}>Đăng ký</NavItem>
            </li>
            </>
          )}

 
        </ul>
        <div className="nav-search">
          <form>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm"
              id='inputseachvfcl'
            />
            <button type="submit" style={{ cursor: 'pointer', display: 'inline' }}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
