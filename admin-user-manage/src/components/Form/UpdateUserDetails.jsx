import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosapi from '../../../../emp-crud/src/utils/axios/axios';
import { toast } from 'react-toastify';
import tconfig from '../../utils/toatify.config';

const defaultFormState = {
  username: '',
  password: '',
  age: 18,
  gender: 'male',
  biodata: '',
  birthdate: '',
};

const UpdateUserDetails = ({ userrole }) => {
  const { userid } = useParams();

  const [formData, setFormData] = useState({ ...defaultFormState });

  const [founduserdata, setFounduserdata] = useState({});

  useEffect(() => {
    const asynfun = async () => {
      const founduser = await axiosapi.get(`/users/${userid}`);
      setFounduserdata(founduser.data);
      if (founduser.status === 200) {
        setFormData(founduser.data);
      } else {
        toast.error('User Not Found Based On Id');
        navigate(`/${userrole}`);
      }
    };
    asynfun();
  }, [userid]);

  const navigate = useNavigate();

  const updateUser = async () => {
    const finaldatatoUpdate = { ...formData };
    delete finaldatatoUpdate.password;
    const data = await axiosapi.patch(`/users/${userid}`, finaldatatoUpdate);
    if (data.status === 200) {
      toast.success('Profile Updated Successfully', { ...tconfig });
    } else {
      toast.error('Somwthing Went Wronge Try Again!', { ...tconfig });
    }
    navigate(`/${userrole}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = JSON.parse(localStorage.getItem('crud-userdata'));
    if (userdata) {
      if (userrole === 'admin' && userdata?.role === 'admin') {
        await updateUser();
      } else if (userrole === 'user' && userdata?.role === 'user') {
        console.log(founduserdata);
        if (founduserdata?.id === userdata?.id) {
          await updateUser();
        } else {
          toast.error('Current User Have no Permissions To Edit This User Data');
          navigate(`/${userrole}`);
        }
      }
    } else {
      toast.error('Try Again!');
      navigate(`/${userrole}`);
    }
  };

  return (
    <div className='p-2 d-flex flex-column justify-content-center'>
      <div className='p-3 mx-auto container '>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>{'User Name'}</label>
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
            <label className='form-label'>{'Age'}</label>
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
            <label className='form-label'>{'Gender'}</label>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadclassioDefault'
                checked={formData.gender === 'male'}
                onChange={(e) => setFormData({ ...formData, gender: 'male' })}
              />
              <label className='form-check-label'>{'Male'}</label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                checked={formData.gender === 'female'}
                onChange={(e) => setFormData({ ...formData, gender: 'female' })}
              />
              <label className='form-check-label'>Female</label>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>{'Birth Date'}</label>
            <input
              type='date'
              className='form-control'
              value={formData.birthdate}
              onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>{'Biodata'}</label>

            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              required
              value={formData.biodata}
              onChange={(e) => setFormData({ ...formData, biodata: e.target.value })}
              placeholder='Tell us About Yourself'
            ></textarea>
          </div>

          <div className='mb-3'>
            <input type='submit' className='form-control' value='Update' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
