import { types } from '../fixtures/types';

export const setTitleNavbar = (title) => ({
  type: types.uiSetTitleNavbar,
  payload: title,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const stopLoading = () => ({
  type: types.uiStopLoading,
});
