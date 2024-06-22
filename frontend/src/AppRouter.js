import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UserAuth from './components/UserAuth';
import Navbar from './components/Navbar';
import store from './store';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={UserAuth} />
          <Route path="/register" component={UserAuth} />
          <PrivateRoute path="/tasks" component={TaskList} />
          <PrivateRoute path="/add-task" component={TaskForm} />
          <Redirect from="/" to="/tasks" />
        </Switch>
      </Router>
    </Provider>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AppRouter;
