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
    <div className="container mt-3">
      <h2>Tasks</h2>
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
  );
};

export default Tasks;
