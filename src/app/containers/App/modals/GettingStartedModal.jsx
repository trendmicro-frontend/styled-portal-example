import {
  Box,
  Button,
  Checkbox,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Space,
  Text,
} from '@trendmicro/react-styled-ui';
import React from 'react';
import imgConnect from './connect.png';

const GettingStartedModal = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      closeOnOutsideClick
      closeOnEsc
      isCloseButtonVisible
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box textAlign="center">
            <Image src={imgConnect} width={320} mb="4x" />
            <Heading size="2xl" mb="2x">
              Getting Started
            </Heading>
            <Text>
              Connect your products to experience all that Trend Micro XDR has to offer.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter align="center" justify="space-between">
          <Box>
            <Checkbox />
            <Space width="2x" />
            Do not remind me again
          </Box>
          <Button variant="primary" onClick={onClose} borderRadius="2rem">
            Connect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GettingStartedModal;
