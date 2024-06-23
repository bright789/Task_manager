// src/redux/actions.js
export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
  });

  export const setTasks = (tasks) => ({
    type: 'SET_TASKS',
    payload: tasks,
  });
