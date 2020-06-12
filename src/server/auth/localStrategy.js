import chalk from 'chalk';
import passportLocal from 'passport-local';
import logger from '../lib/logger';

const log = logger('auth:local');

// TODO
const localStrategy = () => {
  return new passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  }, (username, password, done) => {
    const user = { username };

    // TODO

    log.info(`${chalk.yellow(user.username)} has now signed into the portal`);

    return done(null, user);
  });
};

export default localStrategy;
