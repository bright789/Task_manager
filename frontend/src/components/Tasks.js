// src/components/Tasks.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setTasks } from '../redux/actions';

const Tasks = () => {
  const token = useSelector((state) => state.auth.token);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

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

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
