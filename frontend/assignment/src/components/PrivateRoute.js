import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from '../auth';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const user = getUser();
  return (
    <Route {...rest} render={props => {
      if (!user) return <Redirect to="/login" />;
      if (roles && !roles.includes(user.role)) return <Redirect to="/" />;
      return <Component {...props} />;
    }} />
  );
};

export default PrivateRoute;
