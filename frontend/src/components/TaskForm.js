import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, due_date: dueDate };
    await axios.post('/api/tasks', newTask, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI or handle state change accordingly
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
