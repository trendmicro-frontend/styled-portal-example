import _get from 'lodash/get';

const layoutStyles = {
  brand: {
    height: '12x',
    iconSize: '8x',
  },
  topnav: {
    height: '12x',
    headingSize: 'xl',
  },
  sidenav: {
    navitem: {
      height: '11x',
      iconSize: '6x',
    },
  },
  page: {
    titleTextSize: 'lg',
  },
};

Object.defineProperty(layoutStyles, 'get', {
  value: function get(key, defaultValue) {
    return _get(this, key, defaultValue);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

export default layoutStyles;
