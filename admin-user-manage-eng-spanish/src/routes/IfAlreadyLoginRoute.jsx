import React from 'react';
import { Navigate } from 'react-router-dom';

const IfAlreadyLoginRoute = ({ children }) => {
  const userdata = JSON.parse(localStorage.getItem('crud-userdata'));

  if (userdata?.role === 'user') {
    return <Navigate to='/user' replace />;
  } else if (userdata?.role === 'admin') {
    return <Navigate to='/admin' replace />;
  } else {
    return children;
  }
};

export default IfAlreadyLoginRoute;
