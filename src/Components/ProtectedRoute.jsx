import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../redux/userReducer';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(getCurrentUser);

  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          return <Component {...props} />;
        }
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
      }}
    />
  );
};

export default ProtectedRoute;
