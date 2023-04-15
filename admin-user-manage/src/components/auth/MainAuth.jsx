import React from 'react';
import { Link } from 'react-router-dom';

const MainAuth = () => {
  return (
    <>
      <div className='position-absolute top-50 start-50 translate-middle'>
        <div className='text-center d-flex flex-column gap-2 '>
          <div>
            <h4 className='mb-2'>-: Welcome 😊 :-</h4>
          </div>
          <Link to='/auth/login' className='btn btn-primary'>
            Login
          </Link>
          <Link to='/auth/register' className='btn btn-primary'>
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainAuth;
