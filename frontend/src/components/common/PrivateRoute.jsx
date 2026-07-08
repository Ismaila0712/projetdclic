import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from './Loader';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) return <Loader />;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && !isAdmin()) return <Navigate to="/" />;
    return children;
};

export default PrivateRoute;