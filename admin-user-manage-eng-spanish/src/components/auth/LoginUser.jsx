import React from 'react';

import { useState } from 'react';
import axiosapi from '../../../../emp-crud/src/utils/axios/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tconfig from '../../utils/toatify.config';
import { useNavigate } from 'react-router-dom';

import { getEncryptedPass, comparePassword } from '../../utils/encryptionpass';
import { useTranslation } from 'react-i18next';

const defaultFormState = {
  username: '',
  password: '',
};

const LoginUser = () => {
  const [formData, setFormData] = useState({ ...defaultFormState });

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axiosapi.get('/users');
    const founduser = data.data?.find((el) => el.username === formData.username.trim());
    console.log(founduser);
    if (founduser) {
      console.log(founduser);

      const isuserAuthenticated = await comparePassword(founduser?.password, formData.password);

      if (isuserAuthenticated) {
        localStorage.setItem('crud-userdata', JSON.stringify(founduser));
        if (founduser?.role === 'admin') {
          navigate('/admin');
          toast.success(t('Welcome Admin'), { ...tconfig });
        } else {
          if (founduser?.ban != true) {
            navigate('/user');
            toast.success(t('Welcome User'), { ...tconfig });
          } else {
            navigate('/');
            localStorage.setItem('crud-userdata', JSON.stringify({}));
            toast.error(t('User does not have permission to log in'), { ...tconfig });
          }
        }
      } else {
        navigate('/auth/login');
        setFormData({ ...defaultFormState });
        toast.error('Invalid Credentials! Try Again', { ...tconfig });
      }
    } else {
      navigate('/auth/login');
      setFormData({ ...defaultFormState });

      toast.error('Invalid Credentials! Try Again', { ...tconfig });
    }
  };
  return (
    <div className='p-2 d-flex flex-column justify-content-center'>
      <div className='p-3 mx-auto container '>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>{t('Username')}</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter User Name'
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>{t('Password')}</label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter Password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className='mb-3'>
            <input type='submit' className='form-control' value={t('Login')} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
