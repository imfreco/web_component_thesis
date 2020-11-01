import { types } from '../fixtures/types';

const initialState = {
  dictionary: {
    alphabet: [],
    numbers: [],
  },
  dict_token: '',
  isAuthenticated: false,
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authnDictionaryReaded:
      return {
        ...state,
        dictionary: {
          alphabet: [...action.payload.dictionary.alphabet],
          numbers: [...action.payload.dictionary.numbers],
        },
        dict_token: action.payload.token,
      };
    case types.authLogIn:
      return {
        ...state,
        dictionary: {
          alphabet: initialState.dictionary.alphabet,
          numbers: initialState.dictionary.numbers,
        },
        dict_token: initialState.dict_token,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
