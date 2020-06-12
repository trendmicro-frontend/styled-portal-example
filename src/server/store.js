const path = require('path');
const dotenvFlow = require('dotenv-flow');
const _get = require('lodash/get');
const _set = require('lodash/set');

dotenvFlow.config({
  path: path.resolve(__dirname),
});

const store = {
  env: {
    // private
    jwtSecretKey: process.env.JWT_SECRET_KEY,

    // public
    appVersion: process.env.APP_VERSION,
    apiServerEndpoint: process.env.API_SERVER_ENDPOINT,

    // saml
    samlIssuer: process.env.SAML_ISSUER,
    samlCallbackUrl: process.env.SAML_CALLBACK_URL,
    samlEntryPoint: process.env.SAML_ENTRY_POINT,
    samlCert: process.env.SAML_CERT,
  },
  log: {
    level: process.env.LOG_LEVEL ?? 'debug',
    verbosity: 0,
  },
  server: {
    host: '0.0.0.0',
    port: 0,
    backlog: 511,
    mountPoints: [],
    staticRoot: process.env.SERVER_STATIC_ROOT ?? path.resolve(__dirname, '../app'),
  },
};

Object.defineProperty(store, 'get', {
  value: function get(key, defaultValue) {
    return _get(this, key, defaultValue);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

Object.defineProperty(store, 'set', {
  value: function set(key, value) {
    return _set(this, key, value);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

module.exports = store;
