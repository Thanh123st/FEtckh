// import React, { useState, useRef } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './Wizard.css';

// // Import các component từ thư mục componentswizard
// import DetailArticle from './componentswizard/DetailArticle';
// import Profile from './componentswizard/Profile';
// import Subs from './componentswizard/Subs';
// import UserWrapper from './componentswizard/UserWrapper';
// import Wizard from './componentswizard/Wizard';

// // Định nghĩa NavItem component
// const NavItem = ({ to, onClick, children }) => (
//   <Link to={to} onClick={onClick} className="nav-item-link">
//     {children}
//   </Link>
// );

// function App2() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const items = [
//     { path: "/profile", label: "Hồ sơ cá nhân" },
//     { path: "/logout", label: "Đăng xuất" },
//   ];

//   const Dropdown = React.forwardRef(({ title, items, isOpen, onToggle }, ref) => (
//     <li className="nav-item" ref={ref}>
//       <div className="nav-link" onClick={onToggle}>
//         {title}
//         <i className="fa-solid fa-sort-down"></i>
//       </div>
//       {isOpen && (
//         <div className="nav-item-hidden">
//           {items.map((item, index) => (
//             <NavItem key={index} to={item.path}>
//               {item.label}
//             </NavItem>
//           ))}
//         </div>
//       )}
//     </li>
//   ));

//   return (
//     <Router>
//       <div id="navigationUserWrapper">
//         <div className="left-group">
//           <header className="nav-item">
//             <Link to="">
//               Tạp chí khoa học Trường đại học kỹ thuật - công nghệ Cần Thơ
//             </Link>
//           </header>

//           <div className="nav-item"> 
//             <div className="nav-link">
//               <Link to="">Công việc</Link>
//             </div>
//           </div>
//         </div>
        
//         <div className="right-group">
//           <Link 
//             to="/" 
//             className="nav-item right-group" 
//             style={{
//               display: 'flex', 
//               alignItems: 'center', // Căn giữa theo chiều dọc
//               justifyContent: 'center', // Căn giữa theo chiều ngang
//               textAlign: 'center', // Căn giữa văn bản
//               gap: '5px',
//             }}
//           >
//             <span className="fa fa-eye"></span>
//             Xem trang
//           </Link>

//           <Dropdown 
//             title={
//               <div className="nav-link" style={{ display: 'inline', alignItems: 'center',flexWrap:'nowrap', }}>
//                 <i className="fa-solid fa-user"></i>
//                 <span style={{ marginRight: '4px' }}></span>
//                 khachhang@gmail.com
//                 <span className="badge">0</span>
//               </div>
//             } 
//             items={items} 
//             isOpen={isOpen} 
//             onToggle={toggleDropdown} 
//             ref={dropdownRef} 
//           />
//         </div>
//       </div>

      // <div className="pkp_structure_main">
      //   <div className="pkp_structure_coldum">
      //     <img src="/ass/img/logo.png" alt="Logo" />
      //     <Link to="/baibao" className="">
      //       <span style={{ marginRight: '4px' }}>
      //         <i className="fa-solid fa-box"></i>
      //       </span>
      //       Các bài báo
      //     </Link>
      //   </div>

//         <div className="pkp_structure_content">
//           {/* Định nghĩa các route dẫn đến component */}
//           <Routes>
//             <Route path="/" element={<Subs />} /> {/* Mặc định hiển thị Subs */}
//             <Route path="/profile" element={<Profile />} />

//             <Route path="/userwrapper" element={<UserWrapper />} />
//             <Route path="/wizard" element={<Wizard />} />
//             <Route path="/DetailArticle" element={<DetailArticle />} />
//             <Route path="/logout" element={<div>Đăng xuất</div>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App2;