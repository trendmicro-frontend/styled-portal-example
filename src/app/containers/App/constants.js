import constants from 'namespace-constants';
import { v4 as uuid } from 'uuid';

const NS = `app:${uuid()}`;
const asyncTypes = ['REQUEST', 'SUCCESS', 'FAILURE'];

export const {
  APP_INIT,
  APP_INIT_SUCCESS,
  APP_INIT_FAILURE,
  APP_SET_UNAUTHORIZED,
} = constants(NS, [
  'APP_INIT',
  'APP_INIT_SUCCESS',
  'APP_INIT_FAILURE',
  'APP_SET_UNAUTHORIZED',
]);

export const {
  FETCH_METADATA,
} = constants(NS, {
  'FETCH_METADATA': asyncTypes,
});
