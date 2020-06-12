const path = require('path');

module.exports = {
  extends: 'trendmicro',
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: [
              path.resolve(__dirname, 'src'),
              'node_modules',
            ],
            extensions: ['.js', '.jsx'],
          }
        }
      }
    }
  },
  plugins: [
    'react-hooks',
  ],
  rules: {
    'indent': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'max-lines-per-function': ['warn', {
      max: 1024,
      skipBlankLines: true,
      skipComments: true,
    }],
    'react/jsx-no-bind': ['warn', {
      allowArrowFunctions: true,
    }],
    'react/prop-types': 0,
    "react/jsx-curly-brace-presence": ['error', {
      'props': 'never',
      'children': 'ignore',
    }],
  }
};
