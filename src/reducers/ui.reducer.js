import { types } from '../fixtures/types';

const initialState = {
  titleNavbar: 'Principal',
  showBackdrop: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetTitleNavbar:
      return {
        ...state,
        titleNavbar: action.payload,
      };
    case types.uiStartLoading:
      return {
        ...state,
        showBackdrop: true,
      };
    case types.uiStopLoading:
      return {
        ...state,
        showBackdrop: false,
      };
    default:
      return state;
  }
};
