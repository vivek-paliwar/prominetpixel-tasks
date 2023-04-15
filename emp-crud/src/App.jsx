import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Nav from './components/Nav';
import About from './pages/About';
import Home from './pages/Home';
import AddEmp from './components/AddEmp';
import 'react-toastify/dist/ReactToastify.css';
import Error404 from './pages/Error404';

import axiosapi from './utils/axios/axios';
import tconfig from './utils/axios/toatify.config';

function App() {
  const [records, setRecords] = useState([]);

  const [isupdating, setIsupdating] = useState({
    status: false,
    id: '',
  });

  const navigate = useNavigate();

  const addEmptoRecords = (empdata) => {
    const prevdata = JSON.parse(localStorage.getItem('crud-empdata'));

    if (isupdating.status === true) {
      axiosapi
        .patch(`/emps/${isupdating.id}`, empdata)
        .then((res) => {
          if (res.status === 200) {
            const updatedRecords = records.map((el) => {
              if (el.id === isupdating.id) {
                el.ename = empdata.ename;
                el.age = empdata.age;
                el.gender = empdata.gender;
                el.joiningdate = empdata.joiningdate;
              }

              return el;
            });
            setRecords([...updatedRecords]);
            setIsupdating({ status: false, id: '' });
            localStorage.setItem('crud-empdata', JSON.stringify([...updatedRecords]));

            toast.success('Record Updated Successfully', {
              ...tconfig,
            });
          }
        })
        .catch(() => {
          toast.error('Record Updated Failed! Try Again', {
            ...tconfig,
          });
        });
    } else {
      const createdEmpData = { id: uuidv4(), ...empdata };
      axiosapi
        .post('/emps', createdEmpData)
        .then((res) => {
          if (res.status === 201) {
            setRecords([...records, createdEmpData]);
            localStorage.setItem('crud-empdata', JSON.stringify([...prevdata, createdEmpData]));

            toast.success('Record Added Successfully', {
              ...tconfig,
            });
          }
        })
        .catch(() => {
          toast.error('Record Added Failed! Try Again', {
            ...tconfig,
          });
        });
    }
    navigate('/');
  };

  const deleteEmptoRecord = (id) => {
    axiosapi
      .delete(`/emps/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const updatedRecords = records.filter((el) => el.id != id);
          setRecords([...updatedRecords]);
          localStorage.setItem('crud-empdata', JSON.stringify(updatedRecords));
          toast.success('Record Deleted Successfully', {
            ...tconfig,
          });
        }
      })
      .catch(() => {
        toast.error('Record Deletion Failed! Try Again', {
          ...tconfig,
        });
      });
  };

  useEffect(() => {
    axiosapi
      .get('/emps')
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err.message));

    if (!localStorage.getItem('crud-empdata')) {
      localStorage.setItem('crud-empdata', JSON.stringify([]));
    } else {
      const data = JSON.parse(localStorage.getItem('crud-empdata'));
      setRecords(data);
    }
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              records={records}
              deleteEmptoRecord={deleteEmptoRecord}
              setIsupdating={setIsupdating}
              isupdating={isupdating}
            />
          }
        />
        <Route path='/about' element={<About />} />
        <Route
          path='/add'
          element={
            <AddEmp
              records={records}
              addEmptoRecords={addEmptoRecords}
              setIsupdating={setIsupdating}
              isupdating={isupdating}
            />
          }
        />
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
