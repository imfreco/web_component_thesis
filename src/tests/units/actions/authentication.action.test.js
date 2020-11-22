import jwt from 'jsonwebtoken';
import '@testing-library/jest-dom';

import {
  startDictionaryRead,
  startLogIn,
} from '../../../actions/authentication.action';
import { types } from '../../../fixtures/types';
import * as fetchModule from '../../../helpers/request.helper';
import * as dictionaryModule from '../../../helpers/sort.dictionary.helper';
import { items } from '../../../fixtures/items.store';

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};

const create = (currentState) => {
  const store = {
    getState: jest.fn(() => currentState),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => thunk(store)(next)(action);

  return { store, next, invoke };
};

Storage.prototype.setItem = jest.fn();

describe('Pruebas unitarias en las acciones de autenticación', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('CP12 - Debería ...', async () => {
    const dict_token = 'lp';
    const id_token = 'acdc';
    const refresh_token = 'hbk';
    const email = 'frcortes@education.co';
    const password = 'FRED20';
    const userMock = { user: 1, name: 'Fredy', lastname: 'Cortés', roles: [] };

    const { store, invoke } = create({
      authenticationReducer: { dict_token },
    });

    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json: () => ({ id_token, refresh_token }),
    }));

    jwt.decode = jest.fn(() => userMock);

    await invoke(startLogIn(email, password));

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(fetchModule.fetchWithoutToken).toHaveBeenCalledWith(
      'auth/signin',
      {
        email,
        password,
        dict_token,
      },
      'POST'
    );
    expect(jwt.decode).toHaveBeenCalledWith(id_token);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.authnLogIn,
      payload: {
        id: userMock.user,
        name: userMock.name,
        lastname: userMock.lastname,
        roles: userMock.roles,
        id_token,
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      items.refreshToken,
      refresh_token
    );
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiStopLoading });
  });

  test('CP14 - Debería ...', async () => {
    const dict_token = 'lorem';
    const dictionary = {};
    const sortedDict = { alphabet: [], numbers: [] };

    const { store, invoke } = create({});

    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json: () => ({ dict_token }),
    }));

    jwt.decode = jest.fn(() => ({ dictionary }));

    dictionaryModule.sortDictionary = jest.fn(() => sortedDict);

    await invoke(startDictionaryRead());

    expect(store.getState).not.toHaveBeenCalled();
    expect(jwt.decode).toHaveBeenCalledWith(dict_token);
    expect(dictionaryModule.sortDictionary).toHaveBeenCalledWith(dictionary);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.authnDictionaryReaded,
      payload: { dict_token, dictionary: sortedDict },
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiStopLoading,
    });
  });
});
