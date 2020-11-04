import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({
  isAuthenticated,
  redirect,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
