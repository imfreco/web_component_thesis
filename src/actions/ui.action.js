import { types } from '../fixtures/types';

export const setTitleNavbar = (title) => ({
  type: types.uiSetTitleNavbar,
  payload: title,
});
