import chalk from 'chalk';
import express from 'express';
import _has from 'lodash/has';
import logger from '../lib/logger';
import store from '../store';

const log = logger('routes:api');

const router = express.Router();

/**
 * ## Liveness Probe
 * `/api/healthcheck?livenessProbe`
 * The kubelet uses liveness probes to know when to restart a container. For example, liveness probes could catch a deadlock, where an application is running, but unable to make progress. Restarting a container in such a state can help to make the application more available despite bugs.
 * path: /api/healthcheck?livenessProbe
 *
 * ## Readiness Probe
 * `/api/healthcheck?readinessProbe`
 * The kubelet uses readiness probes to know when a container is ready to start accepting traffic. A Pod is considered ready when all of its containers are ready. One use of this signal is to control which Pods are used as backends for Services. When a Pod is not ready, it is removed from Service load balancers.
 */
router.get('/healthcheck', (req, res) => {
  const data = {
    status: 'ok',
    remoteAddress: req.connection.remoteAddress,
  };

  data.version = store.get('env.appVersion');

  if (_has(req.query, 'livenessProbe')) {
    data.livenessProbe = true;
  }

  if (_has(req.query, 'readinessProbe')) {
    data.readinessProbe = true;
  }

  log.debug(`/healthcheck: res=${chalk.yellow(JSON.stringify(data))}`);

  res.send(data);
});

export default router;
