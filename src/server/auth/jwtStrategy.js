import passportJWT from 'passport-jwt';
import logger from '../lib/logger';
import store from '../store';

const log = logger('auth:jwt');

const jwtStrategy = () => {
  const secretKey = store.get('env.jwtSecretKey');

  return new passportJWT.Strategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: secretKey,
  }, (payload, done) => {
    log.silly(JSON.stringify(payload));

    /**
     * If the credentials are valid, the verify callback invokes `done` to supply Passport
     * with the user that authenticated.
     * ```
     * return done(null, payload)
     * ```
     *
     * If the credentials are not valid, `done` should be invoked with `false` instead of
     * a user to indicate an authentication failure.
     * ```
     * return done(null, false);
     * ```
     */
    return done(null, payload);
  });
};

export default jwtStrategy;
