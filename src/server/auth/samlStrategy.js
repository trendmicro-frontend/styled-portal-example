import chalk from 'chalk';
import ensureArray from 'ensure-array';
import _get from 'lodash/get';
import passportSAML from 'passport-saml';
import logger from '../lib/logger';
import { ensureString } from '../lib/ensure-type';
import store from '../store';

const log = logger('auth:saml');

// FIXME: move hard-coded values to environment variables or store.js
const isAcceptedRole = (role) => {
  role = ensureString(role);
  if (role.startsWith('All of Trend Magic Carpet') || role.startsWith('All of Trend XBC')) {
    return true;
  }
  return false;
};

const samlStrategy = () => {
  const issuer = store.get('env.samlIssuer');
  const callbackUrl = store.get('env.samlCallbackUrl');
  const entryPoint = store.get('env.samlEntryPoint');
  const cert = store.get('env.samlCert');

  return new passportSAML.Strategy({
    issuer,
    callbackUrl,
    entryPoint,
    cert,
    acceptedClockSkewMs: -1,

    /**
     * Set `identifierFormat` to null when SAML provider returned `InvalidNameIDPolicy` error
     */
    identifierFormat: null,
  }, (profile, done) => {
    const emailaddress = ensureString(_get(profile, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'));
    const givenname = ensureString(_get(profile, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'));
    const surname = ensureString(_get(profile, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'));
    const roles = ensureArray(_get(profile, 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'));
    const filteredRoles = roles.filter(role => isAcceptedRole(role));

    // Determine whether the user is in the allowed groups
    if (filteredRoles.length === 0) {
      log.info(`${chalk.yellow(emailaddress)} is not authorized to access the portal`);

      /**
       * If the credentials are not valid or the user is not authorized to access the portal,
       * `done` should be invoked with `false` instead of a user to indicate an authentication
       * failure.
       */
      done(null, false);
      return;
    }

    log.info(`${chalk.yellow(emailaddress)} has now signed into the portal`);

    const user = {
      emailaddress,
      givenname,
      surname,
      roles: filteredRoles,
    };
    done(null, user);
  });
};

export default samlStrategy;
