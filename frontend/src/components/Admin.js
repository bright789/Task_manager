// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
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

    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/api/admin/assign_task', {
        user_id: selectedUser,
        title: taskTitle,
        description: taskDescription,
        due_date: taskDueDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTaskTitle('');
      setTaskDescription('');
      setTaskDueDate('');
      alert('Task assigned successfully');
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Users</h2>
          <ul className="list-group">
            {users.map(user => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                {user.email}
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Assign Task</h2>
          <form onSubmit={handleAssignTask}>
            <div className="mb-3">
              <label htmlFor="userSelect" className="form-label">User</label>
              <select
                id="userSelect"
                className="form-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.email}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="taskTitle" className="form-label">Task Title</label>
              <input
                type="text"
                id="taskTitle"
                className="form-control"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label">Task Description</label>
              <textarea
                id="taskDescription"
                className="form-control"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="taskDueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="taskDueDate"
                className="form-control"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Assign Task</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
