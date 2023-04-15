import React, { useEffect, useState } from 'react';
import axiosapi from '../../../emp-crud/src/utils/axios/axios';
import { toast } from 'react-toastify';
import tconfig from '../utils/toatify.config';
import { useNavigate } from 'react-router-dom';

const ShowAllUsers = ({ userrole, blockeduser }) => {
  const [userRecords, setUserRecords] = useState([]);

  const navigate = useNavigate();

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
      toast.success('User Is Unlocked', { ...tconfig });
    } else {
      toast.error('Try Again!', { ...tconfig });
    }
  };

  const banUser = async (id) => {
    const res = await axiosapi.patch(`/users/${id}`, {
      ban: true,
    });
    if (res.status === 200) {
      setUserRecords([...userRecords.filter((el) => el?.id != id)]);
      toast.success('User Is Blocked', { ...tconfig });
    } else {
      toast.error('Try Again!', { ...tconfig });
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
              <th scope='col'>UserName</th>
              <th scope='col'>Age</th>
              <th scope='col'>Gender</th>
              <th scope='col'>Birth Date</th>
              {userrole === 'admin' && (
                <>
                  <th>Actions</th>
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
                          <button className='btn btn-sm btn-secondary'>Admin</button>
                        ) : (
                          <>
                            {blockeduser ? (
                              <button
                                className='btn btn-sm btn-success'
                                onClick={() => unbanUser(el.id)}
                              >
                                Unban
                              </button>
                            ) : (
                              <button
                                className='btn btn-sm btn-danger'
                                onClick={() => banUser(el.id)}
                              >
                                ban
                              </button>
                            )}
                            <button
                              className='btn btn-sm btn-primary mx-1'
                              onClick={() => {
                                navigate(`/admin/edituserprofile/${el.id}`);
                              }}
                            >
                              Update
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
