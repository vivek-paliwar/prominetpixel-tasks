import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import RecordDisplay from '../components/RecordDisplay';

function Home({ records, deleteEmptoRecord, setIsupdating }) {
  const [searchterm, setSearchterm] = useState('');

  useEffect(() => {
    setIsupdating({ status: false, id: '' });
  }, []);

  return (
    <div className='p-3'>
      <PageHeader title='Home' />

      <Link to='/add' className='btn btn-primary mt-3 mb-3'>
        Add Employee Record
      </Link>

      <input
        type='text'
        className='form-control w-25'
        placeholder='Search By Name...'
        value={searchterm}
        onChange={(e) => setSearchterm(e.target.value)}
        required
      />

      {records.filter((el) => el?.ename.match(new RegExp(searchterm, 'i')))?.length == 0 ? (
        <h6 className='text-center'>No Records Here</h6>
      ) : (
        <RecordDisplay
          records={records.filter((el) => el?.ename.match(new RegExp(searchterm, 'i')))}
          deleteEmptoRecord={deleteEmptoRecord}
          setIsupdating={setIsupdating}
        />
      )}
    </div>
  );
}

export default Home;
