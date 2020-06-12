import http from 'http';
import path from 'path';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import errorhandler from 'errorhandler';
import express from 'express';
import logger, { setLevel } from './lib/logger';
import store from './store';

setLevel(store.get('log.level'));

const log = logger('main');

log.info(`● cwd=${chalk.yellow(process.cwd())}`);
log.info(`● dirname=${chalk.yellow(__dirname)}`);

const app = express();

if (process.env.NODE_ENV === 'development') {
  // Error handler - https://github.com/expressjs/errorhandler
  // Development error handler, providing stack traces and error message responses for requests accepting text, html, or json.
  app.use(errorhandler());

  app.enable('verbose errors'); // Enables verbose errors in development
} else {
  app.disable('verbose errors'); // Disables verbose errors in production
}

app.enable('trust proxy'); // Enables reverse proxy support, disabled by default
app.enable('case sensitive routing'); // Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
app.disable('strict routing'); // Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
app.disable('x-powered-by'); // Enables the X-Powered-By: Express HTTP header, enabled by default

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  require('./routes').default(req, res, next);
});

if (process.env.NODE_ENV === 'development') {
  const watchDirectory = path.resolve(__dirname, 'routes');
  const chokidar = require('chokidar');
  if (chokidar) {
    /**
     * Do "hot-reloading" of express stuff on the server.
     * Throw away cached modules and re-require next time.
     * Ensure there's no important state in there.
     */
    const watcher = chokidar.watch(watchDirectory);

    watcher.on('ready', () => {
      log.info(`Watching ${chalk.yellow(JSON.stringify(watchDirectory))} for file changes`);

      watcher.on('all', () => {
        Object.keys(require.cache).forEach((id) => {
          if (String(id).indexOf(watchDirectory) === 0) {
            log.info(`Clear module cache: id=${JSON.stringify(id)}`);
            delete require.cache[id];
          }
        });
      });
    });
  }
}

{ // HTTP server
  const serverHost = store.get('server.host');
  const serverPort = store.get('server.port');
  const server = http.createServer(app);
  server.listen(serverPort, serverHost, (err) => {
    if (err) {
      throw err;
    }

    const { address, port } = server.address();
    log.info(`Started HTTP server at ${chalk.yellow('http://' + address + ':' + port)}`);
  });
}

process.on('SIGINT', () => {
  // handle graceful shutdown
  process.exit(0);
});
