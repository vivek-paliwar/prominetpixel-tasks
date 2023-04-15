import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecordDisplay({ records, deleteEmptoRecord, setIsupdating }) {
  const navigate = useNavigate();

  return (
    <div className='p-3'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Age</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Joining Date</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((el, index) => (
            <tr key={index}>
              <td>{(index += 1)}</td>
              <td>{el.ename}</td>
              <td>{el.age}</td>
              <td>{el.gender}</td>
              <td>{el.joiningdate}</td>
              <td>
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
                        <h1 className='modal-title fs-5' id='exampleModalToggleLabel'>
                          Delete Operation
                        </h1>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        />
                      </div>
                      <div className='modal-body'>Are You sure you want to Delet This Record ?</div>
                      <div className='modal-footer mx-auto'>
                        <button
                          className='btn btn-sm btn-danger'
                          data-bs-dismiss='modal'
                          onClick={() => {
                            deleteEmptoRecord(el.id);
                          }}
                        >
                          Yes
                        </button>
                        <button className='btn btn-sm btn-primary' data-bs-dismiss='modal'>
                          No
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
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-sm btn-primary mx-1'
                  onClick={() => {
                    setIsupdating({ status: true, id: el.id });
                    navigate('/add');
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordDisplay;
