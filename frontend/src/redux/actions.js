export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const setTasks = (tasks) => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const updateTask = (updatedTask) => ({
  type: 'UPDATE_TASK',
  payload: updatedTask,
});

export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});
