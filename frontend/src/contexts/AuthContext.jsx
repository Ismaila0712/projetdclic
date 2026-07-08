import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/user')
                .then(res => {
                    setUser(res.data);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Erreur de connexion'
            };
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        try {
            const res = await api.post('/register', { name, email, password, password_confirmation });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            const errors = error.response?.data?.errors || {};
            const message = Object.values(errors).flat()[0] ||
                           error.response?.data?.message ||
                           'Erreur lors de l\'inscription';
            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Erreur déconnexion:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const isAdmin = () => user?.is_admin === true;

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};