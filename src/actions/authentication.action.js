import { decode } from 'jsonwebtoken';
import { fetchWithoutToken } from '../helpers/request.helper';
import { types } from '../fixtures/types';
import { sortDictionary } from '../helpers/sort.dictionary.helper';
import { stopLoading } from './ui.action';

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

export const startLogIn = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const { dict_token } = getState().authenticationReducer;
      const res = await fetchWithoutToken(
        'auth/signin',
        { email, password, dict_token },
        'POST'
      );
      const body = await res.json();

      console.log(body);
      if (body.message) {
        console.log(body.message);
      } else {
        dispatch(logIn());
      }

      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

const logIn = () => ({
  type: types.authLogIn,
});
