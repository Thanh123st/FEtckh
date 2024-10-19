import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đảm bảo có .js ở cuối
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Kiểm tra CSS để không xung đột với Bootstrap
import App from './App'; 
import App2 from './App2'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App/> 

  </React.StrictMode>
);
