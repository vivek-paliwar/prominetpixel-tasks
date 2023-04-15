import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';

const defaultFormState = {
  ename: '',
  age: 18,
  gender: 'male',
  joiningdate: '',
};

function AddEmp({ records, addEmptoRecords, isupdating }) {
  const [formData, setFormData] = useState({ ...defaultFormState });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmptoRecords(formData);
  };

  useEffect(() => {
    if (isupdating.status === true) {
      const dataForUpdation = records.find((el) => el.id == isupdating.id);
      setFormData({
        ename: dataForUpdation.ename,
        age: dataForUpdation.age,
        gender: dataForUpdation.gender,
        joiningdate: dataForUpdation.joiningdate,
      });
    }
  }, [isupdating]);

  return (
    <div className='p-2 d-flex flex-column justify-content-center'>
      <PageHeader title={isupdating.status ? 'Update Employee Data' : 'Add Employee Data'} />
      <div className='p-3 mx-auto container '>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Emp Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Employee Name'
              value={formData.ename}
              onChange={(e) => setFormData({ ...formData, ename: e.target.value })}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Age</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Employee Age'
              pattern='\d*'
              maxLength='2'
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Gender</label>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadclassioDefault'
                checked={formData.gender === 'male'}
                onChange={(e) => setFormData({ ...formData, gender: 'male' })}
              />
              <label className='form-check-label'>Male</label>
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
            <label className='form-label'>Joining Date</label>
            <input
              type='date'
              className='form-control'
              value={formData.joiningdate}
              onChange={(e) => setFormData({ ...formData, joiningdate: e.target.value })}
              required
            />
          </div>

          <div className='mb-3'>
            {isupdating.status ? (
              <input type='submit' className='form-control' value='Update' />
            ) : (
              <input type='submit' className='form-control' value='Add' />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmp;
