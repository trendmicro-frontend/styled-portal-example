import moment from 'moment';
import qs from 'qs';
import { call } from 'redux-saga/effects';
import { TRACE, DEBUG, INFO, WARN, ERROR } from 'universal-logger';
import settings from 'app/config/settings';
import i18next from 'app/i18next';
import log from 'app/lib/log';

export function* init() {
  yield call(changeLogLevel);
  yield call(changeLocale);
}

export function* process() {
  yield null;
}

const changeLogLevel = () => {
  const obj = qs.parse(window.location.search.slice(1));
  const level = {
    trace: TRACE,
    debug: DEBUG,
    info: INFO,
    warn: WARN,
    error: ERROR
  }[obj.log_level || settings.log.level];
  log.setLevel(level);
};

const changeLocale = () => new Promise(resolve => {
  const lng = i18next.language;

  if (!lng || lng === 'en') {
    log.debug(`moment: lng=${lng}`);
    resolve();
    return;
  }

  /* eslint-disable-next-line import/no-dynamic-require */
  const bundle = require('bundle-loader!moment/locale/' + lng);
  bundle(() => {
    log.debug(`moment: lng=${lng}`);
    moment().locale(lng);

    resolve();
  });
});
