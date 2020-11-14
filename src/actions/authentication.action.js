import { decode } from 'jsonwebtoken';

import {
  fetchWithoutToken,
  fetchProtectedResource,
} from '../helpers/request.helper';
import { types } from '../fixtures/types';
import { items } from '../fixtures/items.store';
import { sortDictionary } from '../helpers/sort.dictionary.helper';
import { stopLoading } from './ui.action';
import Swal from 'sweetalert2';

export const startDictionaryRead = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('auth/substitution');
      const body = await res.json();

      const payload = decode(body.token);
      const dictionary = sortDictionary(payload.dictionary);
      dispatch(dictionaryReaded(dictionary, body.token));
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

const dictionaryReaded = (dictionary, token) => ({
  type: types.authnDictionaryReaded,
  payload: { dictionary, token },
});

export const startLogIn = (email, password, history) => {
  return async (dispatch, getState) => {
    try {
      const { dict_token } = getState().authenticationReducer;
      const res = await fetchWithoutToken(
        'auth/signin',
        { email, password, dict_token },
        'POST'
      );
      const body = await res.json();

      if (body.message === 'El diccionario de sustitución caducó') {
        Swal.fire(
          'Tenga en cuenta',
          'El tiempo de espera excedió, vuelve a intentarlo',
          'warning'
        );
        history.push('/dashboard');
      } else if (!body.status) {
        const { id_token, refresh_token } = body;
        const { user, name, lastname, roles } = decode(id_token);
        localStorage.setItem(items.refreshToken, refresh_token);
        dispatch(logIn({ id: user, name, lastname, roles, id_token }));
      }

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const logIn = (user) => ({
  type: types.authnLogIn,
  payload: user,
});

export const startSilentAuthentication = () => {
  return async (dispatch) => {
    try {
      const rt = localStorage.getItem(items.refreshToken);

      if (rt) {
        const res = await fetchProtectedResource('auth/refresh', {}, 'GET', rt);
        const body = await res.json();

        console.log(body);
        if (body.message) {
          Swal.fire('Tenga en cuenta', 'Su sesión ha finalizado', 'warning');
          localStorage.removeItem(items.refreshToken);
        } else {
          // console.log('autenticación silenciosa');
          const { id_token, refresh_token } = body;
          const { user, name, lastname, roles } = decode(id_token);
          localStorage.setItem(items.refreshToken, refresh_token);
          dispatch(logIn({ id: user, name, lastname, roles, id_token }));
        }
      }

      dispatch(stopLoadingSilentAuth());
    } catch (error) {
      console.error(error);
    }
  };
};

const stopLoadingSilentAuth = () => ({
  type: types.authnStopLoading,
});

export const startLogOut = () => {
  return async (dispatch, getState) => {
    try {
      const {
        user: { id },
      } = getState().authenticationReducer;

      const res = await fetchWithoutToken(`auth/signout/${id}`, {}, 'PATCH');
      const body = await res.json();

      if (!body.status) {
        localStorage.removeItem(items.refreshToken);
        dispatch(logOut());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOut = () => ({
  type: types.authnLogOut,
});
