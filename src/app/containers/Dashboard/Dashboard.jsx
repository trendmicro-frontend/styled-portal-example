import {
  Box,
  Flex,
  Skeleton,
  Space,
  Stack,
  useColorMode,
} from '@trendmicro/react-styled-ui';
import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const Widget = (props) => {
  const { colorMode } = useColorMode();
  const borderColor = {
    dark: 'gray:90',
    light: 'gray:20',
  }[colorMode];

  return (
    <Box
      border={1}
      borderColor={borderColor}
      borderRadius="sm"
      p="8x"
      {...props}
    />
  );
};

const Widget1 = (props) => {
  return (
    <Widget {...props}>
      <Flex direction="column" height="100%">
        <Box flex="none">
          <Skeleton h="7x" mb="5x" />
        </Box>
        <Stack flex="1" direction="row" spacing="6x">
          <Skeleton flex="1" />
          <Skeleton flex="1" />
          <Skeleton flex="1" />
        </Stack>
        <Space height="12x" />
        <Box flex="none">
          <Skeleton width="25%" h="7x" mb="5x" />
        </Box>
        <Stack flex="1" direction="row" spacing="6x">
          <Skeleton flex="1" />
          <Skeleton flex="1" />
          <Skeleton flex="1" />
        </Stack>
      </Flex>
    </Widget>
  );
};

const Widget2 = (props) => {
  return (
    <Widget {...props}>
      <Flex direction="column" height="100%">
        <Box flex="none">
          <Skeleton width="50%" h="7x" mb="12x" />
        </Box>
        <Stack flex="none" direction="column" spacing="8x">
          <Flex align="center">
            <Box flex="none">
              <Skeleton variant="circle" width="16x" height="16x" />
            </Box>
            <Space width="5x" />
            <Stack flex="1" direction="column" spacing="2x">
              <Skeleton flex="1" />
              <Skeleton flex="1" />
              <Skeleton flex="1" />
            </Stack>
          </Flex>
          <Flex align="center">
            <Box flex="none">
              <Skeleton variant="circle" width="16x" height="16x" />
            </Box>
            <Space width="5x" />
            <Stack flex="1" direction="column" spacing="2x">
              <Skeleton flex="1" />
              <Skeleton flex="1" />
              <Skeleton flex="1" />
            </Stack>
          </Flex>
          <Flex>
            <Box flex="none">
              <Skeleton variant="circle" width="16x" height="16x" />
            </Box>
            <Space width="5x" />
            <Stack flex="1" direction="column" spacing="2x">
              <Skeleton flex="1" />
              <Skeleton flex="1" />
              <Skeleton flex="1" />
            </Stack>
          </Flex>
        </Stack>
        <Space flex="none" height="20x" />
        <Box flex="none">
          <Skeleton width={320} h="7x" mb="12x" />
        </Box>
      </Flex>
    </Widget>
  );
};

const Dashboard = (props) => {
  return (
    <Box p="10x" height="calc(100vh - 48px)">
      <Flex height="100%">
        <Widget1 flex="1" />
        <Space width="6x" />
        <Widget2 flex="none" />
      </Flex>
    </Box>
  );
};

export default compose(
  connect(store => {
    return {};
  }),
)(Dashboard);
