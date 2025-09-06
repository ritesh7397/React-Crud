import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
    try {
      await axios.delete('http://localhost:3000/users/' + id);
      setData(data.filter(user => user.id !== id));
      console.log('User deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('There was an error deleting the user!', error);
    }
  }



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        // console.log(response.data);
        setData(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('There was an error fetching the users!', error);
      }
    };
    fetchUsers(); // call the async function
  }, []);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-95'>
      <h1>List of Users</h1>
      <div className='w-75 rounded bg-white border shadow p-4' >
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Add +</Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr >
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className>
                    <Link to={`/read/${user.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                    <Link to={`/update/${user.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                    <button onClick={e => handleDelete(user.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Home;

