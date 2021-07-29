import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../redux/userReducer';

const ProtectedRoute = ({ component: Component, userRole, ...rest }) => {
  const user = useSelector(getCurrentUser);

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        if (userRole && userRole.indexOf(user.role) === -1) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
