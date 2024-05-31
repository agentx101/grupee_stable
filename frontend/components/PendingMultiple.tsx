import { Box, Flex, Link, Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';

const PendingMultiple = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { multiplePendingTransactions } = useContext(TransactionContext);

  const noOfPendingTransactions = multiplePendingTransactions.length;

  if (noOfPendingTransactions === 0 ) return null;

  return (
    <Box position="relative">
      <Flex
        px="12px"
        py="6px"
        columnGap="8px"
        backgroundColor="primary.800"
        borderRadius="6px"
        _hover={{ backgroundColor: 'primary.900', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Flex alignItems="center">
          <Spinner
            size="xs"
            color="neutral.0"
            thickness='2px'
            speed='1.2s'
          />
        </Flex>
        <Box textStyle="app_med_14" color="neutral.0">{`Pending (${noOfPendingTransactions})`}</Box>
      </Flex>
      {isOpen && (
        <Box
          position="absolute"
          width="300px"
          top="0px"
          mt="52px"
          p="16px"
          borderWidth="1px"
          borderColor="neutral.100"
          borderRadius="6px"
          backgroundColor="neutral.0"
          zIndex={1}
        >
          <Box textStyle="app_semibold_14" color="neutral.900" pb="16px">
            Waiting for confirmation...
          </Box>
          {multiplePendingTransactions.map((el, i) => {
            return (
              <Flex key={i} justifyContent="space-between" py="8px" borderBottomWidth="1px" borderBottomColor="neutral.100">
                <Flex columnGap="16px">
                  <Flex alignItems="center">
                    <Spinner
                      size="xs"
                      color="neutral.900"
                      thickness='2px'
                      speed='1.2s'
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <Text textStyle="app_med_14" color="neutral.900">{`${el.status} ${el.type}`}</Text>
                  </Flex>
                </Flex>

                <Flex alignItems="center">
                  <Link textStyle="app_med_14" color="primary.500" href={`https://mumbai.polygonscan.com/tx/${el.hash}`} isExternal>
                    View in Explorer
                  </Link>
                </Flex>
              </Flex> 
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default PendingMultiple;