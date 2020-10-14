import { types } from '../fixtures/types';

const initialState = {
  averages: [],
  sisbens: [],
  populations: [],
  inscriptions: [],
};

export const inscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.inscriptionAveragesLoaded:
      return {
        ...state,
        averages: [...action.payload],
      };
    case types.inscriptionSisbensLoaded:
      return {
        ...state,
        sisbens: [...action.payload],
      };
    case types.inscriptionPopulationsLoaded:
      return {
        ...state,
        populations: [...action.payload],
      };
    default:
      return state;
  }
};
