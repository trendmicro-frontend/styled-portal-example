import ensureArray from 'ensure-array';
import superagent from 'superagent';
import superagentUse from 'superagent-use';
import log from 'app/lib/log';
import configStore from 'app/store/config';
import { APP_SET_UNAUTHORIZED } from 'app/containers/App/constants';
import reduxStore from 'app/store/redux';
import {
  HTTP_STATUS_401_NOT_AUTHORIZED,
} from './constants';

const bearer = (request) => {
  const token = configStore.get('session.token');
  if (token) {
    request.set('Authorization', 'Bearer ' + token);
  }
};

// Modify request headers and query parameters to prevent caching
const noCache = (request) => {
  const now = Date.now();
  request.set('Cache-Control', 'no-cache');
  request.set('X-Requested-With', 'XMLHttpRequest');

  if (request.method === 'GET' || request.method === 'HEAD') {
    // Force requested pages not to be cached by the browser by appending "_={timestamp}" to the GET parameters, this will work correctly with HEAD and GET requests. The parameter is not needed for other types of requests, except in IE8 when a POST is made to a URL that has already been requested by a GET.
    request._query = ensureArray(request._query);
    request._query.push(`_=${now}`);
  }
};

const request = superagentUse(superagent);
request
  .use(bearer)
  .use(noCache);

const Request = request.Request;
const end = Request.prototype.end;
Request.prototype.end = function(next) {
    return end.call(this, function(err, res) { // eslint-disable-line
    if (res && res.status === HTTP_STATUS_401_NOT_AUTHORIZED) {
      const err = new Error(`Unauthorized access: status=${res.status}`);
      log.warn(err);
      next(err);
      reduxStore.dispatch({ type: APP_SET_UNAUTHORIZED });
      return;
    }

    if (typeof next !== 'function') {
      return;
    }

    next(err, res);
  });
};

export default request;
