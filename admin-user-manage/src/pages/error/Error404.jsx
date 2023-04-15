import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className='bg-primary'>
      <div className='position-absolute top-50 start-50 translate-middle'>
        <div className='text-center d-flex flex-column '>
          <h4 className='mb-2'>Error 404! Page Not Found</h4>
          <Link to='/' className='btn btn-secondary'>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error404;
