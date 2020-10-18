import { types } from '../fixtures/types';

const initialState = {
  components: [],
  menuDetails: [],
};

export const planningReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.planningComponentCreated:
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case types.planningComponentsReaded:
      return {
        ...state,
        components: [...action.payload],
      };
    case types.planningMenuDetailAdded:
      return {
        ...state,
        menuDetails: [...state.menuDetails, action.payload],
      };
    case types.planningMenuDetailDeleted:
      return {
        ...state,
        menuDetails: state.menuDetails.filter(
          (detail) => detail.componentId !== action.payload
        ),
      };
    case types.planningMenuDetailsReseted:
      return {
        ...state,
        menuDetails: initialState.menuDetails,
      };
    default:
      return state;
  }
};
