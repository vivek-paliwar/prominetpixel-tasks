import React from 'react';
import { useState } from 'react';
import axiosapi from '../../../../emp-crud/src/utils/axios/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tconfig from '../../utils/toatify.config';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { getEncryptedPass } from '../../utils/encryptionpass';
import { useTranslation } from 'react-i18next';

const defaultFormState = {
  username: '',
  password: '',
  age: 18,
  gender: 'male',
  biodata: '',
  birthdate: '',
};

const RegisterUser = () => {
  const [formData, setFormData] = useState({ ...defaultFormState });

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generatedpass = await getEncryptedPass(formData.password);
    const createdUserData = {
      id: uuidv4(),
      ...formData,
      role: 'user',
      ban: false,
      password: generatedpass,
    };
    console.log(createdUserData);
    try {
      const data = await axiosapi.post('/users', createdUserData);
      if (data) {
        setFormData({ ...defaultFormState });
        navigate('/user');
        localStorage.setItem('crud-userdata', JSON.stringify(createdUserData));
        toast.success(t('User Registered Successfully'), {
          ...tconfig,
        });
      }
    } catch (error) {
      navigate('/auth/register');
      toast.error('User Registration Failed! Try Again', { ...tconfig });
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
            <label className='form-label'>{t('Age')}</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Age'
              pattern='\d*'
              maxLength='2'
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>{t('Gender')}</label>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadclassioDefault'
                checked={formData.gender === 'male'}
                onChange={(e) => setFormData({ ...formData, gender: 'male' })}
              />
              <label className='form-check-label'>{t('Male')}</label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                checked={formData.gender === 'female'}
                onChange={(e) => setFormData({ ...formData, gender: 'female' })}
              />
              <label className='form-check-label'>{t('Female')}</label>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>{t('Birth Date')}</label>
            <input
              type='date'
              className='form-control'
              value={formData.birthdate}
              onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>{t('Biodata')}</label>

            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              required
              onChange={(e) => setFormData({ ...formData, biodata: e.target.value })}
              placeholder='Tell us About Yourself'
            ></textarea>
          </div>

          <div className='mb-3'>
            <input type='submit' className='form-control' value={t('Register')} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
