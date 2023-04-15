import React, { useEffect, useState } from 'react';
import axiosapi from '../../../emp-crud/src/utils/axios/axios';
import { toast } from 'react-toastify';
import tconfig from '../utils/toatify.config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ShowAllUsers = ({ userrole, blockeduser }) => {
  const [userRecords, setUserRecords] = useState([]);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [searchterm, setSearchterm] = useState('');

  useEffect(() => {
    axiosapi
      .get('/users')
      .then((res) => {
        blockeduser
          ? setUserRecords(res.data?.filter((el) => el?.ban === true))
          : setUserRecords(res.data?.filter((el) => el?.ban === false));
      })
      .catch((err) => console.log(err.message));
  }, [blockeduser]);

  const unbanUser = async (id) => {
    const res = await axiosapi.patch(`/users/${id}`, {
      ban: false,
    });
    if (res.status === 200) {
      setUserRecords([...userRecords.filter((el) => el?.id != id)]);
      toast.success(t('User Is Unblocked'), { ...tconfig });
    } else {
      toast.error(t('Try Again!'), { ...tconfig });
    }
  };

  const banUser = async (id) => {
    const res = await axiosapi.patch(`/users/${id}`, {
      ban: true,
    });
    if (res.status === 200) {
      setUserRecords([...userRecords.filter((el) => el?.id != id)]);
      toast.success(t('User Is Blocked'), { ...tconfig });
    } else {
      toast.error(t('Try Again!'), { ...tconfig });
    }
  };

  return (
    <>
      <div className='p-4'>
        <input
          type='text'
          className='form-control w-50  mt-2 mb-4'
          placeholder='Search By UserName...'
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
          required
        />
        <table className='table '>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>{t('Username')}</th>
              <th scope='col'>{t('Age')}</th>
              <th scope='col'>{t('Gender')}</th>
              <th scope='col'>{t('Birth Date')}</th>
              {userrole === 'admin' && (
                <>
                  <th>{t('Actions')}</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {userRecords
              .filter((el) => el?.username.match(new RegExp(searchterm, 'i')))
              ?.map((el, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{el.username}</td>
                  <td>{el.age}</td>
                  <td>{el.gender}</td>
                  <td>{el.birthdate}</td>
                  {userrole === 'admin' && (
                    <>
                      <td>
                        {el?.role === 'admin' ? (
                          <button className='btn btn-sm btn-secondary'>{t('Admin')}</button>
                        ) : (
                          <>
                            {blockeduser ? (
                              <>
                                <div
                                  className='modal fade'
                                  id='exampleModalToggle'
                                  aria-hidden='true'
                                  aria-labelledby='exampleModalToggleLabel'
                                  tabIndex='-1'
                                >
                                  <div className='modal-dialog modal-dialog-centered'>
                                    <div className='modal-content'>
                                      <div className='modal-header'>
                                        <h1
                                          className='modal-title fs-5'
                                          id='exampleModalToggleLabel'
                                        >
                                          {t('Unblock User')}
                                        </h1>
                                        <button
                                          type='button'
                                          className='btn-close'
                                          data-bs-dismiss='modal'
                                          aria-label='Close'
                                        />
                                      </div>
                                      <div className='modal-body'>
                                        Are You sure you want to UnBlock This User ?
                                      </div>
                                      <div className='modal-footer mx-auto'>
                                        <button
                                          className='btn btn-sm btn-danger'
                                          data-bs-dismiss='modal'
                                          onClick={() => unbanUser(el.id)}
                                        >
                                          {t('Yes')}
                                        </button>
                                        <button
                                          className='btn btn-sm btn-primary'
                                          data-bs-dismiss='modal'
                                        >
                                          {t('No')}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className='btn btn-sm btn-success'
                                  data-bs-target='#exampleModalToggle'
                                  data-bs-toggle='modal'
                                >
                                  {t('Unban')}
                                </button>
                              </>
                            ) : (
                              <>
                                <div
                                  className='modal fade'
                                  id='exampleModalToggle'
                                  aria-hidden='true'
                                  aria-labelledby='exampleModalToggleLabel'
                                  tabIndex='-1'
                                >
                                  <div className='modal-dialog modal-dialog-centered'>
                                    <div className='modal-content'>
                                      <div className='modal-header'>
                                        <h1
                                          className='modal-title fs-5'
                                          id='exampleModalToggleLabel'
                                        >
                                          {t('Block User')}
                                        </h1>
                                        <button
                                          type='button'
                                          className='btn-close'
                                          data-bs-dismiss='modal'
                                          aria-label='Close'
                                        />
                                      </div>
                                      <div className='modal-body'>
                                        Are You sure you want to Block This User ?
                                      </div>
                                      <div className='modal-footer mx-auto'>
                                        <button
                                          className='btn btn-sm btn-danger'
                                          data-bs-dismiss='modal'
                                          onClick={() => banUser(el.id)}
                                        >
                                          {t('Yes')}
                                        </button>
                                        <button
                                          className='btn btn-sm btn-primary'
                                          data-bs-dismiss='modal'
                                        >
                                          {t('No')}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className='btn btn-sm btn-danger'
                                  data-bs-target='#exampleModalToggle'
                                  data-bs-toggle='modal'
                                >
                                  {t('Ban')}
                                </button>
                              </>
                            )}
                            <button
                              className='btn btn-sm btn-primary mx-1'
                              onClick={() => {
                                navigate(`/admin/edituserprofile/${el.id}`);
                              }}
                            >
                              {t('Update')}
                            </button>
                          </>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowAllUsers;
