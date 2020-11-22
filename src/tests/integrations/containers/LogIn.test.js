import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStock from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { LogIn } from '../../../containers/LogIn';
import {
  startLogIn,
  startDictionaryRead,
} from '../../../actions/authentication.action';

jest.mock('../../../actions/authentication.action', () => ({
  startDictionaryRead: jest.fn(),
  startLogIn: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStock(middlewares);

const dictionary = {
  alphabet: [{ original: 'A', substitute: '2' }],
  numbers: [{ original: '1', substitute: '9' }],
};

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

describe('Pruebas de integración en el módulo de autenticación', () => {
  test('CP - Debería ...', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(startDictionaryRead).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.MuiBox-root')).toHaveLength(2);
    expect(wrapper.find('.MuiChip-root')).toHaveLength(
      dictionary.alphabet.length + dictionary.numbers.length
    );

    wrapper.find('.MuiButtonBase-root').at(1).prop('onClick')();

    expect(store.dispatch).toHaveBeenCalledTimes(4);
    expect(startLogIn).toHaveBeenCalledTimes(1);
  });
});
