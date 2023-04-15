import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { linkurlpaths } from '../../routes/paths';
import { toast } from 'react-toastify';
import tconfig from '../../utils/toatify.config';
import { useTranslation } from 'react-i18next';

const Layout = ({ userrole }) => {
  const defaultPaths = linkurlpaths[userrole];

  const navigate = useNavigate();

  const { i18n, t } = useTranslation();

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  const userdata = JSON.parse(localStorage.getItem('crud-userdata'));
  const logOutUser = () => {
    console.log('log');
    localStorage.setItem('crud-userdata', JSON.stringify({}));
    navigate('/');
    toast.success(t('User Loged Out Successfully'), { ...tconfig });
  };

  return (
    <>
      <div className='container-fluid overflow-hidden'>
        <div className='row vh-100 overflow-auto'>
          <div className='col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top'>
            <div className='d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white'>
              <a
                href='/'
                className='d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none'
              >
                <span className='fs-5'>{t('Crud')}</span>
              </a>
              <ul
                className='nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start'
                id='menu'
              >
                {defaultPaths?.map((el) => (
                  <li className='nav-item' key={el.label}>
                    <Link to={el.url} className='nav-link px-sm-0 px-2'>
                      <i className='fs-5 bi-house'></i>
                      <span className='ms-1 '>{t(el.label)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className='dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1'>
                <a
                  href='#'
                  className='d-flex align-items-center text-white text-decoration-none dropdown-toggle'
                  id='dropdownUser1'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <img
                    src='https://avatars.githubusercontent.com/u/48591295?v=4'
                    alt='hugenerd'
                    width='28'
                    height='28'
                    className='rounded-circle'
                  />
                  <span className='d-none d-sm-inline mx-1'>
                    {userdata?.username + ` ( ${userdata?.role} ) `}
                  </span>
                </a>
                <ul
                  className='dropdown-menu dropdown-menu-dark text-small shadow mb-2'
                  aria-labelledby='dropdownUser1'
                >
                  <li>
                    <a className='dropdown-item' href='#' onClick={logOutUser}>
                      {t('Sign out')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col d-flex flex-column h-100'>
            <main className='row'>
              <Outlet />
            </main>
            <footer className='row bg-light py-4 mt-auto'>
              <div className='d-flex justify-content-between '>
                {t('Bottom footer content here')}...
                <div className='d-flex '>
                  <div>
                    <p>{t('Change Language Here')}</p>
                  </div>
                  <div>
                    <button
                      onClick={changeLanguage}
                      value='en'
                      className='mx-2 btn btn-sm btn-primary'
                    >
                      English
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={changeLanguage}
                      value='es'
                      className='mx-2 btn btn-sm btn-primary'
                    >
                      Español
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
