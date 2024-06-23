// src/components/Tasks.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setTasks } from '../redux/actions';

const Tasks = () => {
  const token = useSelector((state) => state.auth.token);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token, dispatch]);

  const handleAddTask = async () => {
    if (!title || !dueDate) {
      setError('Title and Due Date are required');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/tasks',
        { title, description, due_date: dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setTasks([...tasks, response.data]));
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Tasks</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Title:</label>
          <input type="text" id="taskTitle" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Description:</label>
          <textarea id="taskDescription" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="taskDueDate" className="form-label">Due Date:</label>
          <input type="date" id="taskDueDate" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <button onClick={handleAddTask} className="btn btn-primary mb-3">Add Task</button>
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <p>Due: {task.due_date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
