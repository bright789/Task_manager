import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskItem;
