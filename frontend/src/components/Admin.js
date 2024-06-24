import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">All Registered Users</h5>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {user.email} (Admin: {user.is_admin ? 'Yes' : 'No'})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
