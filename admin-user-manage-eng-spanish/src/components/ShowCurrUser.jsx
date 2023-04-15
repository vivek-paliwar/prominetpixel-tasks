import React, { useEffect, useState } from 'react';
import axiosapi from '../../../emp-crud/src/utils/axios/axios';
import { toast } from 'react-toastify';
import tconfig from '../utils/toatify.config';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

const ShowCurrUser = ({ userId, userrole }) => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const asyncFn = async () => {
      let id = '';

      if (userId) {
        id = userId;
      } else {
        id = JSON.parse(localStorage.getItem('crud-userdata'))?.id;
      }

      const resdata = await axiosapi.get(`/users/${id}`);
      if (resdata.status == 404) {
        toast.error('User Not Found', { ...tconfig });
      } else if (resdata.status === 200) {
        setUserData(resdata.data);
      }
    };
    asyncFn();
  }, [userId]);

  return (
    <>
      <div>
        {userData && (
          <>
            <div className='card w-100'>
              <div className='card-body'>
                <h6 className='card-subtitle mb-2 text-body-secondary mt-1'>{t('Username')}</h6>
                <p className='card-text'>{userData?.username}</p>
                <h6 className='card-subtitle mb-2 text-body-secondary mt-1'>{t('Age')} </h6>
                <p className='card-text'>{userData?.age}</p>
                <h6 className='card-subtitle mb-2 text-body-secondary mt-1'>{t('Gender')} </h6>
                <p className='card-text'>{userData?.gender}</p>
                <h6 className='card-subtitle mb-2 text-body-secondary mt-1'>{t('Birth Date')} </h6>
                <p className='card-text'>{userData?.birthdate}</p>
                <h6 className='card-subtitle mb-2 text-body-secondary mt-1'>{t('Biodata')} </h6>
                <p className='card-text'>{userData?.biodata}</p>
                {userrole === 'user' ? (
                  <button
                    className='btn btn-primary mt-2'
                    onClick={() => {
                      navigate(`/user/editprofile/${userData?.id}`);
                    }}
                  >
                    {t('Edit Profile')}
                  </button>
                ) : (
                  <>
                    <h6 className='card-subtitle mb-2 text-body-secondary mt-1'>{t('Role')}</h6>
                    <p className='card-text'>{userData?.role} ( Master User ) </p>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShowCurrUser;
