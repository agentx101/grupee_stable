import { Box, Image, Button, Text, Spinner } from '@chakra-ui/react';
import React from 'react';

const CTAButton = (props: any) => {
  const { name, disabled, icon, onClick, responsive, isLoading } = props;

  return (
    <>
      <Box
        display={{ base: responsive ? "none" : "flex", md: "flex"}}
        as={Button}
        backgroundColor="primary.500"
        borderRadius="6px"
        py="12px"
        px="20px"
        textAlign="center"
        _hover={{ bg: "primary.700" }}
        disabled={disabled}
        leftIcon={icon && (
          <Image
            src={icon}
            alt="logo"
            width="16px"
            height="16px"
          />
        )}
        isLoading={isLoading}
        spinner={<Spinner
          size="xs"
          color="neutral.0"
          thickness='2px'
          speed='0.75s'
        />}
        onClick={onClick}
      >
        <Text ml="auto" mr="auto" color="white" textStyle="app_reg_14">
          {name}
        </Text>
      </Box>
      <Box display={{ base: responsive ? "flex" : "none", md: "none" }} flexDirection="column">
        <Box
          as={Button}
          width="50px"
          height="50px"
          ml="auto"
          mr="auto"
          backgroundColor="primary.500"
          borderRadius="100%"
          textAlign="center"
          _hover={{ bg: "primary.700" }}
          isLoading={isLoading}
          spinner={<Spinner
            size="xs"
            color="neutral.0"
            thickness='2px'
            speed='0.75s'
          />}
          onClick={onClick}
        >
          <Image
            src={icon}
            alt="logo"
            width="40px"
            height="40px"
          />
        </Box>
        <Box mt="8px" textAlign="center" textStyle="app_med_12">
          {name}
        </Box>
      </Box>
    </>
  )
}

export default CTAButton;

