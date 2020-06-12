import {
  Flex,
  Heading,
  Space,
  useDisclosure,
} from '@trendmicro/react-styled-ui';
import React from 'react';
import IconButton from 'app/components/IconButton';
import { useStyledUI } from 'app/components/StyledUI';
import TMIcon from 'app/components/TMIcon';
import settings from 'app/config/settings';
import GettingStartedModal from './modals/GettingStartedModal';

const TopNav = (props) => {
  const { colorMode, toggleColorMode, getColorStyle, getLayoutStyle } = useStyledUI();
  const primaryColor = getColorStyle('primaryColor');
  const secondaryColor = getColorStyle('secondaryColor');
  const topnavBackgroundColor = getColorStyle('topnav.backgroundColor');
  const topnavBorderColor = getColorStyle('topnav.borderColor');
  const topnavHeight = getLayoutStyle('topnav.height');
  const topnavHeadingSize = getLayoutStyle('topnav.headingSize');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        backgroundColor={topnavBackgroundColor}
        borderBottom={1}
        borderBottomColor={topnavBorderColor}
        color={primaryColor}
        height={topnavHeight}
        align="center"
        justify="space-between"
        flexWrap="nowrap"
        {...props}
      >
        <Heading
          fontFamily="Interstate-Light"
          size={topnavHeadingSize}
          px="4x"
        >
          {settings.productName}
        </Heading>
        <Flex
          color={secondaryColor}
          px="5x"
          align="center"
        >
          <IconButton onClick={toggleColorMode}>
            {colorMode === 'dark' && <TMIcon name="moon" />}
            {colorMode === 'light' && <TMIcon name="sun" />}
          </IconButton>
          <Space width="4x" />
          <IconButton onClick={onOpen}>
            <TMIcon name="more" />
          </IconButton>
        </Flex>
      </Flex>
      <GettingStartedModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default TopNav;
