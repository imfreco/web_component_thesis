import { types } from '../fixtures/types';

const initialState = {
  components: [],
};

export const planningReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.planningComponentCreated:
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    default:
      return state;
  }
};
