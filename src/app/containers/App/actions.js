import { createAction } from 'redux-action';
import {
  APP_INIT,
  APP_INIT_SUCCESS,
  APP_INIT_FAILURE,
  APP_SET_UNAUTHORIZED,
  FETCH_METADATA,
} from './constants';

export const appInit = createAction(APP_INIT);
export const appInitSuccess = createAction(APP_INIT_SUCCESS);
export const appInitFailure = createAction(APP_INIT_FAILURE);
export const appSetUnauthorized = createAction(APP_SET_UNAUTHORIZED);
export const fetchMetadata = createAction(FETCH_METADATA.REQUEST);
