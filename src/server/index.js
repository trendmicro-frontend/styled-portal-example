import http from 'http';
import path from 'path';
import chalk from 'chalk';
import logger, { setLevel } from './lib/logger';
import store from './store';
import serverListener from './server';

setLevel(store.get('log.level'));

const log = logger('main');

log.info(`● cwd=${chalk.yellow(process.cwd())}`);
log.info(`● dirname=${chalk.yellow(__dirname)}`);

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
  const server = http.createServer(serverListener);
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
