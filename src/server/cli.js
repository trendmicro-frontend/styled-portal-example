/* eslint-disable no-console */
require('core-js/stable'); // to polyfill ECMAScript features
require('regenerator-runtime/runtime'); // needed to use transpiled generator functions

const path = require('path');
const program = require('commander');
const pkg = require('./package.json');
const store = require('./store');

// Defaults to 'production'
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const increaseVerbosityLevel = (val, total) => {
  return total + 1;
};

const parseMountPoint = (val, acc) => {
  val = val || '';

  const mount = {
    route: '/',
    target: val
  };

  if (val.indexOf(':') >= 0) {
    const r = val.match(/(?:([^:]*)(?::(.*)))/);
    mount.route = r[1];
    mount.target = r[2];
  }

  // Join path in posix mode to avoid introducing \ separators when running on Windows
  mount.route = path.posix.join('/', mount.route || '').trim();
  mount.target = (mount.target || '').trim();

  acc.push(mount);

  return acc;
};

const defaultHost = '0.0.0.0';
const defaultPort = 80;

program
  .version(pkg.version, '--version', 'output the current version')
  .usage('[options]')
  .option('-p, --port <port>', `Set listen port (default: ${defaultPort})`, defaultPort)
  .option('-H, --host <host>', `Set listen address or hostname (default: ${defaultHost})`, defaultHost)
  .option('-b, --backlog <backlog>', 'Set listen backlog (default: 511)', 511)
  .option('-v, --verbose', 'Increase the verbosity level (-v, -vv, -vvv)', increaseVerbosityLevel, 0)
  .option('-m, --mount <route-path>:<target>', 'Add a mount point for serving static files', parseMountPoint, []);

program.on('--help', () => {
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('  $ cli -vv');
  console.log('  $ cli --mount /widget:/home/widget');
  console.log('');
});

program.parse(process.argv);

const verbosity = program.verbose;
const level = {
  1: 'verbose',
  2: 'debug',
  3: 'silly',
}[verbosity] || 'info';

store.set('log.verbosity', verbosity);
store.set('log.level', level);
store.set('server.host', program.host);
store.set('server.port', program.port);
store.set('server.backlog', program.backlog);
store.set('server.mountPoints', program.mount);

require('./index');
