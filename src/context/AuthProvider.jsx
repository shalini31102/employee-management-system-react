import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const stored = localStorage.getItem('employees');
        return stored ? JSON.parse(stored) : initialEmployees;
    });

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(userData));
    }, [userData]);

    return (
        <AuthContext.Provider value={[userData, setUserData]}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider