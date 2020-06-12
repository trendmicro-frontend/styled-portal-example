import {
  Box,
  Flex,
} from '@trendmicro/react-styled-ui';
import React from 'react';
import { useStyledUI } from 'app/components/StyledUI';

const SideNav = (props) => {
  const {
    getColorStyle,
  } = useStyledUI();
  const borderColor = getColorStyle('sidenav.borderColor');
  const backgroundColor = getColorStyle('sidenav.backgroundColor');

  return (
    <Flex
      direction="column"
      backgroundColor={backgroundColor}
      borderRight={1}
      borderRightColor={borderColor}
      {...props}
    >
      <Box
        height="100%"
        overflow="hidden"
        minWidth="16x"
      />
    </Flex>
  );
};

export default SideNav;
