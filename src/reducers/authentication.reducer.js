import { types } from '../fixtures/types';

const initialState = {
  dictionary: {
    alphabet: [],
    numbers: [],
  },
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authnDictionaryReaded:
      return {
        ...state,
        dictionary: {
          alphabet: [...action.payload.alphabet],
          numbers: [...action.payload.numbers],
        },
      };
    default:
      return state;
  }
};
