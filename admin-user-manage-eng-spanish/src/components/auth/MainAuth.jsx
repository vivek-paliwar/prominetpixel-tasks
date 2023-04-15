import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MainAuth = () => {
  const { i18n, t } = useTranslation();

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }
  return (
    <>
      <div className='position-absolute top-50 start-50 translate-middle'>
        <div className='text-center d-flex flex-column gap-2 '>
          <div>
            <h4 className='mb-2'>-: {t('Welcome')} :-</h4>
          </div>
          <Link to='/auth/login' className='btn btn-primary'>
            {t('Login')}
          </Link>
          <Link to='/auth/register' className='btn btn-primary'>
            {t('Register')}
          </Link>
          <div className='d-flex flex-column gap-2 mt-5'>
            {t('Change Language Here')}...
            <button onClick={changeLanguage} value='en' className=' mx-3 btn btn-sm btn-primary'>
              English
            </button>
            <button onClick={changeLanguage} value='es' className='mx-3 btn btn-sm btn-primary'>
              Español
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainAuth;
