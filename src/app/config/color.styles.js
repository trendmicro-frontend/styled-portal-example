import _get from 'lodash/get';

const colorStyles = {
  dark: {
    emphasisColor: 'white:emphasis',
    primaryColor: 'white:primary',
    secondaryColor: 'white:secondary',
    tertiaryColor: 'white:tertiary',
    disabledColor: 'white:disabled',
    shadow: {
      sm: 'dark.sm',
      md: 'dark.md',
      lg: 'dark.lg',
    },

    defaultBackgroundColor: 'gray:100',
    defaultBorderColor: 'gray:60',
    defaultDividerColor: 'gray:60',
    defaultTextColor: 'white:primary',

    sidenav: {
      backgroundColor: '#000',
      borderColor: '#000',
      navitem: {
        backgroundColor: 'gray:100',
        activeBackgroundColor: 'black',
      },
    },

    topnav: {
      backgroundColor: 'gray:90',
      borderColor: 'gray:90',
    },
  },
  light: {
    emphasisColor: 'black:emphasis',
    primaryColor: 'black:primary',
    secondaryColor: 'black:secondary',
    tertiaryColor: 'black:tertiary',
    disabledColor: 'black:disabled',
    shadow: {
      sm: 'light.sm',
      md: 'light.md',
      lg: 'light.lg',
    },

    defaultBackgroundColor: 'white',
    defaultBorderColor: 'gray:30',
    defaultDividerColor: 'gray:30',
    defaultTextColor: 'black:primary',

    sidenav: {
      backgroundColor: 'gray:40',
      borderColor: 'gray:40',
      navitem: {
        backgroundColor: 'gray:10',
        activeBackgroundColor: 'gray:20',
      },
    },

    topnav: {
      backgroundColor: '#eb5757',
      borderColor: '#eb5757',
    },
  },
};

Object.defineProperty(colorStyles, 'get', {
  value: function get(key, defaultValue) {
    return _get(this, key, defaultValue);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

export default colorStyles;
