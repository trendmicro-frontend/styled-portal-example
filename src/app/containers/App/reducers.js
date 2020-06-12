import { createReducer } from 'redux-action';
import {
  APP_INIT,
  APP_INIT_SUCCESS,
  APP_INIT_FAILURE,
  APP_SET_UNAUTHORIZED,
} from './constants';

const initialState = {
  isInitializing: true,
  isUnauthorized: false,
  error: null,
};

export default createReducer(initialState, {
  [APP_INIT]: () => ({
    isInitializing: true,
  }),
  [APP_INIT_SUCCESS]: () => ({
    isInitializing: false,
    error: null,
  }),
  [APP_INIT_FAILURE]: (error) => ({
    isInitializing: false,
    error,
  }),
  [APP_SET_UNAUTHORIZED]: () => ({
    isUnauthorized: true,
  }),
});
