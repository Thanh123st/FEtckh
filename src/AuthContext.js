import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    // Khôi phục trạng thái đăng nhập từ localStorage
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedEmail = localStorage.getItem('email');

        if (storedLoggedIn === 'true' && storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
        }
    }, []); // Chạy một lần khi ứng dụng khởi động

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
