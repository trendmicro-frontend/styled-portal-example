const path = require('path');

module.exports = {
  apps: [
    {
      name: 'portal',
      script: path.resolve(__dirname, './server/cli.js'),
      env: {
        NODE_ENV: 'production',
      },
      env_cluster: {
        instances: 2,
        exec_mode: 'cluster',
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_inspect: {
        NODE_ENV: 'development',
        NODE_OPTIONS: '--inspect',
      },
    },
  ],
};
