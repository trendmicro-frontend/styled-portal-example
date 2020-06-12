import chalk from 'chalk';
import passport from 'passport';
import logger from '../lib/logger';

const log = logger('auth:dev');

class DevStrategy extends passport.Strategy {
  constructor(options, verify) {
    if (typeof options === 'function') {
      verify = options;
      options = {};
    }
    if (typeof verify !== 'function') {
      throw new TypeError('DevStrategy requires a verify callback');
    }

    super();
    this.name = 'dev';
    this._verify = verify;
  }

  authenticate() {
    const callback = (err, user, info) => {
      if (err) {
        this.error(err);
        return;
      }
      if (!user) {
        this.fail(info);
        return;
      }
      this.success(user, info);
    };

    try {
      this._verify(callback);
    } catch (e) {
      this.error(e);
    }
  }
}

const devStrategy = (options) => {
  return new DevStrategy(options, (done) => {
    const user = {
      username: 'nobody',
    };

    log.info(`${chalk.yellow(user.username)} is accessing the portal`);

    return done(null, user);
  });
};

export default devStrategy;
