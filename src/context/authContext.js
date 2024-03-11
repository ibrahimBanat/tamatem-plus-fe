import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    accessToken: '',
    setAccessToken: () => {},
    refreshToken: '',
    setRefreshToken: () => {},
    handleLogin: () => {},
    handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        const storedRefreshToken = sessionStorage.getItem('refresher');
        const storedAccessToken = sessionStorage.getItem('access');
        if (storedRefreshToken) {
            setIsLoggedIn(true);
            setRefreshToken(storedRefreshToken);
            setAccessToken(storedAccessToken);
        }
    }, []);

    const handleLogin = (newAccessToken, newRefreshToken) => {
        setIsLoggedIn(true);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        sessionStorage.setItem('refresher', newRefreshToken);
        sessionStorage.setItem('access', newAccessToken);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAccessToken('');
        setRefreshToken('');
        sessionStorage.removeItem('refresher');
        sessionStorage.removeItem('access');
    };

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        handleLogin,
        handleLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
