import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";

const ClaimID = (props: any) => {
  const { setMode } = props; 
  const [value, setValue] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleValueChange = (event: any) => setValue(event.target.value);

  const claimID = async () => {
    if (!value) {
      return;
    }

    try {
      setIsLoading(true);

      const invalidUserName = await setTimeout(() => true, 5000);
      
      if(invalidUserName) {
        setError('This ID is already taken. Try another ID.')
      }
      

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <InputGroup mt="16px">
        <Input
          value={value}
          placeholder="Enter your ID"
          color="neutral.800"
          borderWidth="0px"
          backgroundColor="neutral.50"
          onChange={handleValueChange}
          errorBorderColor="red.light"
          isInvalid={!!error}
          _disabled={{ opacity: 1 }}
        />
      </InputGroup>

      {error && <Text mt="12px" color={"red.light"} textStyle="app_reg_14">
        {error}
      </Text>}

      <Text my="12px" textStyle="app_med_12" color="neutral.500">
      {`https://wisp.finance/${value ? value : ""}`}
      </Text>

      <Box
        as={Button}
        mt="16px"
        backgroundColor="primary.800"
        borderRadius="6px"
        py="12px"
        width="100%"
        textAlign="center"
        leftIcon={
          <Image
            src="/icons/check.svg"
            alt="Chevron Down"
            width="16px"
            height="16px"
          />
        }
        _hover={{ bg: "primary.700" }}
        color="neutral.0"
        textStyle="app_reg_14"
        isDisabled={!value}
        isLoading={isLoading}
        onClick={claimID}
      >
        Claim ID
      </Box>
    </>
  )
}

export default ClaimID;