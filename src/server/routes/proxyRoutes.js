import chalk from 'chalk';
import express from 'express';
import proxy from 'express-http-proxy';
import _get from 'lodash/get';
import passport from 'passport';
import logger from '../lib/logger';
import store from '../store';

const log = logger('routes:proxy');

const router = express.Router();

const apiServerEndpoint = store.get('env.apiServerEndpoint');

router.use(
  (() => {
    // Use DevStrategy to bypass JWT authentication in development mode
    if (process.env.NODE_ENV === 'development') {
      return passport.authenticate('dev', { session: false });
    }

    return passport.authenticate('jwt', { session: false });
  })(),
  proxy(apiServerEndpoint, {
    https: true,

    // Operate on the path before issuing the proxy request
    proxyReqPathResolver: (req) => {
      log.silly(`proxyReqPathResolver: path=${chalk.yellow(JSON.stringify(req.path))}`);
      return req.path;
    },

    // Override request options before issuing the proxyRequest
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const method = srcReq.method;
      const path = srcReq.path;
      const body = (() => {
        const { headers, body } = srcReq;
        const contentType = _get(headers, 'content-type');

        if (contentType === 'application/json') {
          return JSON.stringify(body);
        }

        if (contentType === 'application/x-www-form-urlencoded') {
          return Object.keys(body).map(key => {
            const value = body[key];
            return `${key}=${value}`;
          }).join('&');
        }

        // possibly POST/PUT methods with empty request body
        if (!contentType && typeof body === 'object') {
          return JSON.stringify(body);
        }

        log.warn('Unknown body type:', body);
        return body;
      })();

      log.debug(`method=${chalk.yellow(method)}, path=${chalk.yellow(path)}, body=${chalk.yellow(body)}`);

      proxyReqOpts.headers['x-posix-time'] = String(timestamp);

      return proxyReqOpts;
    },

    // You can use `proxyReqBodyDecorator` to transform content only when necessary
    //proxyReqBodyDecorator: (bodyContent, srcReq) => bodyContent,
  }),
);

export default router;
