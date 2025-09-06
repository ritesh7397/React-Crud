import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/' + id);
        setValues(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('There was an error fetching the users!', error);
      }
    };
    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('http://localhost:3000/users/' + id, values);
      setValues(response.data);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('There was an error updating the user!', error);
    }
  }


  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className='mb-2'>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' className='form-control' placeholder='Enter Name'
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })} />
          </div>
          <div className='mb-2'>
            <label htmlFor="email">Email:</label>
            <input type="email" name='email' className='form-control' placeholder='Enter Email'
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })} />
          </div>
          <div className='mb-3'>
            <label htmlFor="email">Phone:</label>
            <input type="text" name='phone' className='form-control' placeholder='Enter Phone'
              value={values.phone}
              onChange={e => setValues({ ...values, phone: e.target.value })} />
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to="/" className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>
    </div>
  )
}

export default Update
