import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  // const [values, setValues] = useState({
  //   name: '',
  //   email: '',
  //   phone: ''
  // })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/' + id);
        setData(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('There was an error fetching the users!', error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Detail of User</h3>
        <div className='mb-2'>
          <strong>Name: {data.name}</strong>
        </div>
        <div className='mb-2'>
          <strong>Email: {data.email}</strong>
        </div>
        <div className='mb-2'>
          <strong>Phone: {data.phone}</strong>
        </div>
        <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
        <Link to="/" className='btn btn-primary ms-3'>Back</Link>

      </div>

    </div>
  )
}

export default Read
