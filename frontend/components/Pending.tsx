import { Box, Flex, Spinner } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';

const Pending = () => {
  const { isPending, setIsPendingModalOpen } = useContext(TransactionContext);

  if(!isPending) return null;

  return (
    <Flex
      px="12px"
      py="6px"
      columnGap="8px"
      backgroundColor="primary.800"
      borderRadius="6px"
      _hover={{ backgroundColor: 'primary.900', cursor: 'pointer' }}
      onClick={() => setIsPendingModalOpen(true)}
    >
      <Flex alignItems="center">
        <Spinner
          size="xs"
          color="neutral.0"
          thickness='2px'
          speed='1.2s'
        />
      </Flex>
      <Box textStyle="app_med_14" color="neutral.0">Pending</Box>
    </Flex>
  )
}

export default Pending;