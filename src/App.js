// App.js
import React, { useState } from 'react';  // Import useState để quản lý state
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/AuthContext';  

import Home from './components/Home';
import PurposeScope from './components/PurposeScope';
import PubFreq from './components/PubFreq';
import EditEthics from './components/EditEthics';
import PoliciesPrinciples from './components/PoliciesPrinciples';
import Sponsorship from './components/Sponsorship';
import AuthGuidelines from './components/AuthGuidelines';
import RevGuidelines from './components/RevGuidelines';
import Edit from './components/Edit';
import Archiving from './components/Archiving';
import Submission from './components/Submission';
import Login from './components/Login';
import Register from './components/Register';
import Layoutindex from './components/Layoutindex';
import Layoutview from './components/Layoutview';
import DetailArticle from './componentswizard/DetailArticle';
import Profile from './componentswizard/Profile';
import Subs from './componentswizard/Subs';
import Wizard from './componentswizard/Wizard';

// Bắt đầu App
function App() {
  // Khởi tạo state cho isLoggedIn và email
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Giá trị mặc định là false
  const [email, setEmail] = useState('');  // Email ban đầu là chuỗi rỗng

  return (
    // AuthContext.Provider với các state đã được khai báo
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn, email, setEmail }}>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Purpose-Scope" element={<PurposeScope />} />
            <Route path="/Pub-Freq" element={<PubFreq />} />
            <Route path="/Edit-Ethics" element={<EditEthics />} />
            <Route path="/Policies-Principles" element={<PoliciesPrinciples />} />
            <Route path="/Sponsorship" element={<Sponsorship />} />
            <Route path="/Auth-Guidelines" element={<AuthGuidelines />} />
            <Route path="/Rev-Guidelines" element={<RevGuidelines />} />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/Archiving" element={<Archiving />} />
            <Route path="/Submission" element={<Submission />} />
            <Route path="/Layoutindex" element={<Layoutindex />} />
            <Route path="/Layoutview" element={<Layoutview />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Subs" element={<Subs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/detailArticle" element={<DetailArticle />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
