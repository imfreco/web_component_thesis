import { types } from '../fixtures/types';

const initialState = {
  dictionary: {
    alphabet: [],
    numbers: [],
  },
  dict_token: '',
  id_token: '',
  user: {
    name: '',
    lastname: '',
    roles: [],
  },
  isAuthenticated: false,
  isLoading: true,
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
        id_token: action.payload.id_token,
        user: {
          name: action.payload.name,
          lastname: action.payload.lastname,
          roles: [...action.payload.roles],
        },
        isAuthenticated: true,
      };
    case types.authnStopLoading:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
