import React from 'react';
import { Navigate } from 'react-router-dom';
function Protected({ userrole, children }) {
  const userdata = JSON.parse(localStorage.getItem('crud-userdata'));

  console.log(userdata);
  if (userdata?.username && userdata?.role === userrole) {
    return children;
  } else {
    alert('Unauthorized User');
    return <Navigate to='/' replace />;
  }
}
export default Protected;
