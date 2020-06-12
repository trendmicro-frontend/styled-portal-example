import _has from 'lodash/has';

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
const healthcheck = (req, res) => {
  const data = {
    status: 'ok',
  };

  if (_has(req.query, 'livenessProbe')) {
    data.livenessProbe = true;
  }

  if (_has(req.query, 'readinessProbe')) {
    data.readinessProbe = true;
  }

  res.send(data);
};

export default healthcheck;
