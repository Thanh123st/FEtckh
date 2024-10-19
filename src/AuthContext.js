// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
