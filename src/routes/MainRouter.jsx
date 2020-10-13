import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Dashboard from './Dashboard';
import { store } from '../store';

export const MainRouter = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            {/* <Route exact path='/auth/login' component={} /> */}
            <Route path='/dashboard' component={Dashboard} />

            <Redirect to='/dashboard' />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};
