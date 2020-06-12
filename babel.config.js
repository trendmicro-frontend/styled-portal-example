module.exports = {
  extends: '@trendmicro/babel-config',
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      }
    ],
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
    'lodash',
    // Enable async/await for jest
    '@babel/plugin-transform-runtime',
  ],
};
