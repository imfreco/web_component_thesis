import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStock from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { MainRouter } from '../../../routes/MainRouter';
import {
  startSilentAuthentication,
  startDictionaryRead,
} from '../../../actions/authentication.action';

const middlewares = [thunk];
const mockStore = configureStock(middlewares);

const dictionary = {
  alphabet: [{ original: 'A', substitute: '2' }],
  numbers: [{ original: '1', substitute: '9' }],
};

jest.mock('../../../actions/authentication.action', () => ({
  startSilentAuthentication: jest.fn(),
  startDictionaryRead: jest.fn(),
}));

describe('Prueba de integración sobre el enrutador principal', () => {
  test('CP - Debería ...', () => {
    const initState = {
      authenticationReducer: {
        isAuthenticated: false,
        dictionary,
      },
      uiReducer: {
        showBackdrop: false,
      },
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(startSilentAuthentication).toHaveBeenCalledTimes(1);
  });
});
