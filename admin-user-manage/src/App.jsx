import { ToastContainer, toast } from 'react-toastify';

import Layout from './components/layouts/Layout';
import Error404 from './pages/error/Error404';

import { Link, Outlet, Route, Routes } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import { useEffect } from 'react';
import Protected from './routes/ProtectedRoute';
import MainAuth from './components/auth/MainAuth';
import LoginUser from './components/auth/LoginUser';
import RegisterUser from './components/auth/RegisterUser';

import IfAlreadyLoginRoute from './routes/IfAlreadyLoginRoute';
import ShowAllUsers from './components/ShowAllUsers';
import ShowCurrUser from './components/ShowCurrUser';
import UpdateUserDetails from './components/Form/UpdateUserDetails';

function App() {
  useEffect(() => {
    if (!localStorage.getItem('crud-userdata')) {
      localStorage.setItem('crud-userdata', JSON.stringify({}));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <MainAuth />
            </>
          }
        />
        <Route
          path='/auth'
          element={
            <IfAlreadyLoginRoute>
              <div className='mt-2 d-flex justify-content-center'>
                <Link to='/' className='btn btn-secondary '>
                  Go Back
                </Link>
              </div>
              <Outlet />
            </IfAlreadyLoginRoute>
          }
        >
          <Route
            path='/auth/login'
            element={
              <>
                <PageHeader title={'Login 🛡️'} />
                <LoginUser />
              </>
            }
          />
          <Route
            path='/auth/register'
            element={
              <>
                <PageHeader title={'Register ✅'} />
                <RegisterUser />
              </>
            }
          />
        </Route>

        <Route
          path='/user'
          element={
            <Protected userrole={'user'}>
              <Layout userrole={'user'} />
            </Protected>
          }
        >
          <Route
            path='/user'
            element={
              <>
                <PageHeader title={'User Details'} />
                <ShowCurrUser userrole={'user'} />
              </>
            }
          />
          <Route
            path='/user/editprofile/:userid'
            element={
              <>
                <PageHeader title={'Edit Profile'} />
                <UpdateUserDetails userrole={'user'} />
              </>
            }
          />
          <Route
            path='/user/allusers'
            element={
              <>
                <PageHeader title={'All Users'} />
                <ShowAllUsers userrole={'user'} blockeduser={true} />
              </>
            }
          />
        </Route>

        <Route
          path='/admin'
          element={
            <Protected userrole={'admin'}>
              <Layout userrole={'admin'} />
            </Protected>
          }
        >
          <Route
            path='/admin'
            element={
              <>
                <PageHeader title={'Dashboard'} />
                <ShowCurrUser userrole={'admin'} />
              </>
            }
          />
          <Route
            path='/admin/users'
            element={
              <>
                <PageHeader title={'Users'} />
                <ShowAllUsers userrole={'admin'} blockeduser={false} />
              </>
            }
          />
          <Route
            path='/admin/blockedusers'
            element={
              <>
                <PageHeader title={'Blocked User'} />
                <ShowAllUsers userrole={'admin'} blockeduser={true} />
              </>
            }
          />
          <Route
            path='/admin/edituserprofile/:userid'
            element={
              <>
                <PageHeader title={'Edit Profile'} />
                <UpdateUserDetails userrole={'admin'} />
              </>
            }
          />
        </Route>

        <Route path='*' element={<Error404 />} />
      </Routes>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='light'
      />
    </>
  );
}

export default App;
