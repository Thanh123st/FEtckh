import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đảm bảo có .js ở cuối
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './Css/index.css';
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App/> 

  </React.StrictMode>
);

// Set css của tiniMce
// Chỉnh lại Logic Logout
// Sữa lại giao diện
// Chỉnh get cái lưu trữ với chưa xong
// Làm dùng Redux