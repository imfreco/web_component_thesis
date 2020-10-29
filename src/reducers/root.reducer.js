import { combineReducers } from 'redux';
import { inscriptionReducer } from './inscription.reducer';
import { uiReducer } from './ui.reducer';
import { planningReducer } from './planning.reducer';
import { authenticationReducer } from './authentication.reducer';

export const rootReducer = combineReducers({
  inscriptionReducer,
  uiReducer,
  planningReducer,
  authenticationReducer,
});
