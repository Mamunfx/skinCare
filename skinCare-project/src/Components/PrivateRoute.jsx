import React, { useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import LoadingState from './components/LoadingState';
import { AuthContext } from './AuthProvider/AuthProvider';

const Private_Route = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingState />;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Private_Route;
