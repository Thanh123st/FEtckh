import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken ] = useState('');
    const [role, setRole] = useState('');
    
    const [accountName, setAccountName] = useState('');
    const apiUrl = 'http://192.168.10.153:8000';
    
    // Khôi phục trạng thái đăng nhập từ localStorage
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedEmail = localStorage.getItem('email');
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (storedLoggedIn && storedEmail && storedToken) {
          setIsLoggedIn(storedLoggedIn);
          setEmail(storedEmail);
          setToken(storedToken);
          setRole(storedRole);
        }
      }, [setIsLoggedIn, setEmail, setToken, setRole]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail,token, setToken, apiUrl ,accountName, setAccountName,role,setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };




