import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <h1>Task Manager</h1>
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <Tasks token={token} />
      )}
    </div>
  );
};

export default App;
