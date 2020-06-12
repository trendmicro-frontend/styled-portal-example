import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _merge from 'lodash/merge';
import settings from 'app/config/settings';
import log from 'app/lib/log';
import EventEmitterStore from './EventEmitterStore';
import defaultState from './defaultState';

const storageKey = 'react-styled-app'; // FIXME rename the storage key
const config = new EventEmitterStore(defaultState);

config.toJSONString = () => {
  const content = localStorage.getItem(storageKey) || '{}';
  return content;
};

config.getDefaultState = () => defaultState;

config.persist = (data) => {
  const { version, state } = { ...data };

  data = {
    version: version || settings.version,
    state: {
      ...config.state,
      ...state
    }
  };

  try {
    const value = JSON.stringify(data, null, 2);
    localStorage.setItem(storageKey, value);
  } catch (e) {
    log.error(e);
  }
};

config.restoreDefault = () => {
  config.state = { ...defaultState };
};

const normalizeState = (state) => {
  // TODO
  return state;
};

const app = {
  error: false,
  version: settings.version,
  state: {}
};

try {
  const text = config.toJSONString();
  const data = JSON.parse(text);
  app.version = _get(data, 'version', settings.version);
  app.state = _get(data, 'state', {});
} catch (e) {
  log.error(e);

  app.error = true;
}

config.state = normalizeState(_merge({}, defaultState, app.state || {}));

// Debouncing enforces that a function not be called again until a certain amount of time (e.g. 100ms) has passed without it being called.
config.on('change', _debounce((state) => {
  config.persist({ state: state });
}, 100));

//
// Migration
//
const migrateStore = () => {
  if (app.error) {
    // Probably due to corrupted app settings
    return;
  }

  if (!app.version) {
    return;
  }
};

try {
  migrateStore();
} catch (err) {
  log.error(err);
}

export default config;
