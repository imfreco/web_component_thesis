import React from 'react';
import { Provider } from 'react-redux';
import { MainRouter } from './routes/MainRouter';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};
