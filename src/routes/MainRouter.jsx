import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startSilentAuthentication } from '../actions/authentication.action';
import { ProtectedRoute } from './ProtectedRoute';
import { Dashboard } from './Dashboard';
import { LogIn } from '../containers/LogIn';
import { Backdrop, CircularProgress } from '@material-ui/core';

export const MainRouter = () => {
  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.authenticationReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('authentication silent');
    dispatch(startSilentAuthentication());
  }, [dispatch]);

  if (isLoading)
    return (
      <Backdrop open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/auth/login' component={LogIn} />

          <ProtectedRoute
            path='/dashboard'
            component={Dashboard}
            isAuthenticated={isAuthenticated}
            redirect={'/auth/login'}
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
