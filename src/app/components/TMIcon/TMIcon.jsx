import { Box } from '@trendmicro/react-styled-ui';
import cx from 'classnames';
import { keyframes } from 'emotion';
import React from 'react';

const spinKeyframes = keyframes`
    0% {
        transform: rotate(0eg);
    }
    100% {
        transform: rotate(359deg);
    }
`;

const spinReverseKeyframes = keyframes`
    0% {
        transform: rotate(359deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

const TMIcon = React.forwardRef(({
  spin,
  spinReverse,
  className,
  name,
  ...props
}, ref) => {
  return (
    <Box
      ref={ref}
      as="i"
      name={name}
      color="inherit"
      className={cx(className, 'tmicon', { [`tmicon-${name}`]: !!name })}
      display="inline-block"
      lineHeight="1"
      animation={
        (spin && `${spinKeyframes} 2s infinite linear`) ||
                (spinReverse && `${spinReverseKeyframes} 2s infinite linear`) ||
                ''
      }
      {...props}
    />
  );
});

export default TMIcon;
