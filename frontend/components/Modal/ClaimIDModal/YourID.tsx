import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Mode } from "./ClaimIDModal";

const YourID = (props: any) => {
  const { setMode, id } = props;
  const [value, setValue] = useState<string | undefined>(id);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleValueChange = (event: any) => setValue(event.target.value);
  const closeTooltip = () => setTimeout(() => setIsCopied(false), 3000);

  return (
    <>
    <InputGroup mt="16px">
      <InputLeftElement as={Box} justifyContent="center" alignItems="center">
        <Image
          src="/icons/wallet-grey.svg"
          alt="wallet"
          width="20px"
          height="20px"
        />
      </InputLeftElement>
      <Input
        value={value}
        placeholder="Enter your ID"
        color="neutral.800"
        borderWidth="0px"
        backgroundColor="neutral.50"
        onChange={handleValueChange}
        errorBorderColor="red.light"
        _disabled={{ opacity: 1 }}
        isDisabled
      />
      <InputRightElement
        as={Box}
        justifyContent="center"
        alignItems="center"
        background="transparent"
        borderTopRightRadius="6px"
        borderBottomRightRadius="6px"
        _hover={{ bg: "neutral.100", cursor: "pointer"}}
        onClick={() => setMode(Mode.EDIT)}
      >
        <Image
          src="/icons/pencil.svg"
          alt="pencil"
          width="18px"
          height="18px"
        />
      </InputRightElement>
    </InputGroup>

    <Box
      mt="16px"
      width="100%"
      p="8px"
      borderWidth="1px"
      borderRadius="6px"
      display="flex"
      justifyContent="space-between"
      backgroundColor="neutral.50"
    >
      <Flex columnGap="8px">
        <Flex justifyContent="center" alignItems="center">
          <Image
            src="icons/lock.svg"
            alt="Lock"
            width="20px"
            height="20px"
          />
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Text
            textStyle="app_reg_12"
            color="neutral.800"
            textAlign="left"
          >{`https://wisp.finance/${value ? value : ""}`}</Text>
        </Flex>
      </Flex>
      <Tooltip
        label="Copied"
        placement="top"
        hasArrow
        arrowSize={8}
        offset={[0, 15]}
        isOpen={isCopied}
        onOpen={closeTooltip}
      >
        <Box
          as={Button}
          borderRadius="6px"
          backgroundColor="primary.800"
          px="10px"
          height="36px"
          leftIcon={
            <Image
              src="icons/copy.svg"
              alt="Copy"
              width="16px"
              height="16px"
            />
          }
          color="neutral.0"
          _hover={{ bg: "primary.700" }}
          textStyle="app_med_12"
          onClick={() => {
            navigator.clipboard.writeText(`https://wisp.finance/${value}`);
            setIsCopied(true);
          }}
        >
          Copy
        </Box>
      </Tooltip>
    </Box>
    </>
  )
}

export default YourID;