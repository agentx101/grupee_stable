import React from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/react';

const Token = (props: any) => {
  const { source, name } = props;

  return (
    <Flex>
      <Box>
        <Image
          src={source}
          alt="Ethereum Logo"
          width="28px"
          height="28px"
        />
      </Box>
      <Text
        color="black"
        textStyle="app_reg_14"
        ml="8px"
        mt="4px"
      >
        {name}
      </Text>
    </Flex>
  )
}

export default Token;