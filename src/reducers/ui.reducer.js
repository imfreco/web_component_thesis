import { types } from '../fixtures/types';

const initialState = {
  titleNavbar: 'Principal',
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetTitleNavbar:
      return {
        ...state,
        titleNavbar: action.payload,
      };
    default:
      return state;
  }
};
