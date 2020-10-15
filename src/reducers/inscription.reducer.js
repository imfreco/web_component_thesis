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
    case types.inscriptionCreate:
      return {
        ...state,
        inscriptions: [...state.inscriptions, action.payload],
      };
    case types.inscriptionsReaded:
      return {
        ...state,
        inscriptions: action.payload,
      };
    case types.inscriptionAdmitted:
      return {
        ...state,
        inscriptions: state.inscriptions.map((inscription) => {
          if (inscription.id === action.payload) {
            inscription.state = 1;
          }
          return inscription;
        }),
      };
    default:
      return state;
  }
};
