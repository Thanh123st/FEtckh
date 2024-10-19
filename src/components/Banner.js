import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

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

const Banner = ({ userEmail, toggleUserMenu, isUserMenuOpen }) => {

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { isLoggedIn, email } = useContext(AuthContext);
  const { setIsLoggedIn, setEmail } = useContext(AuthContext); // Sử dụng AuthContext để cập nhật trạng thái

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

  const handleLogout = () => {
    // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    
    // Cập nhật trạng thái trong AuthContext
    setIsLoggedIn(false);
    setEmail('');

    // Điều hướng người dùng đến trang đăng nhập
    navigate('/');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownItemsIntro = [
    { label: 'Mục đích và phạm vi của tạp chí', path: '/Purpose-Scope', onClick: () => setOpenDropdown(null) },
    { label: 'Tần suất xuất bản', path: '/Pub-Freq', onClick: () => setOpenDropdown(null) },
    { label: 'Biên tập và đạo đức xuất bản', path: '/Edit-Ethics', onClick: () => setOpenDropdown(null) },
    { label: 'Chính sách chung và các nguyên tắc', path: '/Policies-Principles', onClick: () => setOpenDropdown(null) },
    { label: 'Tài trợ tạp chí', path: '/Sponsorship', onClick: () => setOpenDropdown(null) },
  ];

  const dropdownItemsGuide = [
    { label: 'Hướng dẫn tác giả', path: '/Auth-Guidelines', onClick: () => setOpenDropdown(null) },
    { label: 'Hướng dẫn phản biện', path: '/Rev-Guidelines', onClick: () => setOpenDropdown(null) },
  ];

  const dropdownItemsAcc = [
    { label: 'Quản lý bài viết', path: '/Subs', onClick: () => setOpenDropdown(null) },
    { label: 'Hồ sơ cá nhân', path: '/Profile', onClick: () => setOpenDropdown(null) },
    { label: 'Đăng xuất', path: '/', onClick: () => {setOpenDropdown(null);handleLogout(); }},
  ];

  return (
    <div className="Banner">
      <header>
        <img src="/ass/img/CTUET.png" alt="Banner" />
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
            <NavItem to="/Edit" onClick={() => setIsMenuOpen(false)}>Biên tập</NavItem>
          </li>
          <li className="nav-item">
            <NavItem to="/Archiving" onClick={() => setIsMenuOpen(false)}>Lưu trữ</NavItem>
          </li>
          <li className="nav-item">
            <NavItem to="/Submission" onClick={() => setIsMenuOpen(false)}>Gửi bài</NavItem>
          </li>
          {isLoggedIn ? (
            
            <Dropdown
              title={email}
              items={dropdownItemsAcc}
              isOpen={openDropdown === 3}
              onToggle={() => toggleDropdown(3)}
              ref={dropdownRef3}
            />
          ) : (
            <>
            <li className="nav-item">
              <NavItem to="/Login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</NavItem>
            </li>
            <li className="nav-item">
              <NavItem to="/Register" onClick={() => setIsMenuOpen(false)}>Đăng ký</NavItem>
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
