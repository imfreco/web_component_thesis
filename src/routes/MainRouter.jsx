import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Dashboard from './Dashboard';

export const MainRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route exact path='/auth/login' component={} /> */}
          <Route path='/dashboard' component={Dashboard} />

          <Redirect to='/dashboard' />
        </Switch>
      </div>
    </Router>
  );
};
