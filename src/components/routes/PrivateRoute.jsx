import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className='flex justify-center items-center h-svh'><span className="loading loading-infinity loading-lg"></span></div>;

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
