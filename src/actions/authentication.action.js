import { decode } from 'jsonwebtoken';
import { fetchWithoutToken } from '../helpers/request.helper';
import { types } from '../fixtures/types';
import { sortDictionary } from '../helpers/sort.dictionary.helper';

export const startDictionaryRead = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('auth/substitution');
      const body = await res.json();

      const payload = decode(body.token);
      const dictionary = sortDictionary(payload.dictionary);
      dispatch(dictionaryReaded(dictionary));
    } catch (error) {
      console.log(error);
    }
  };
};

const dictionaryReaded = (dictionary) => ({
  type: types.authnDictionaryReaded,
  payload: dictionary,
});
