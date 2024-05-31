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
} from "@chakra-ui/react";
import { Mode } from "./ClaimIDModal";

const EditID = (props: any) => {
  const { setMode, id } = props;
  const [value, setValue] = useState<string | undefined>(id);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleValueChange = (event: any) => {
    setValue(event.target.value);
  }

  const deleteID = () => console.log("Delete ID");
  const saveChanges = () => console.log("Save Changes");

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
          isInvalid={!!error}
          _disabled={{ opacity: 1 }}
          // isDisabled={!isEditing}
          onFocus={() => setIsEditing(true)}
        />
        {!isEditing && (
          <InputRightElement
            as={Box}
            justifyContent="center"
            alignItems="center"
            background="transparent"
            borderTopRightRadius="6px"
            borderBottomRightRadius="6px"
            _hover={{ bg: "neutral.100", cursor: "pointer"}}
            onClick={() => {
              setMode(Mode.YOUR_ID);
            }}
          >
            <Image
              src="/icons/pencil.svg"
              alt="pencil"
              width="18px"
              height="18px"
            />
          </InputRightElement>
        )}
      </InputGroup>

      {error && <Text mt="12px" color={"red.light"} textStyle="app_reg_14">
        {error}
      </Text>}

      <Text my="12px" textStyle="app_med_12" color="neutral.500">
        {`https://wisp.finance/${value ? value : ""}`}
      </Text>

      {!isEditing && (
        <Box
          as={Button}
          mt="16px"
          backgroundColor="red.light"
          borderRadius="6px"
          py="12px"
          width="100%"
          textAlign="center"
          leftIcon={
            <Image
              src="/icons/trash.svg"
              alt="icon"
              width="16px"
              height="16px"
            />
          }
          _hover={{ bg: "red.dark" }}
          color="neutral.0"
          textStyle="app_reg_14"
          isLoading={isLoading}
          onClick={deleteID}
        >
          Delete ID
        </Box>
      )}

      {isEditing && (
        <Flex columnGap="8px">
          <Box
            as={Button}
            mt={"16px"}
            backgroundColor="neutral.50"
            borderRadius="6px"
            py="12px"
            width="100%"
            textAlign="center"
            _hover={{ bg: "neutral.100" }}
            color="neutral.900"
            textStyle="app_reg_12"
            onClick={() => {
              // TODO: Set back to original ID
              setIsEditing(false);
            }}
          >
            Cancel
          </Box>
          <Box
            as={Button}
            mt={"16px"}
            backgroundColor="primary.800"
            borderRadius="6px"
            py="12px"
            width="100%"
            textAlign="center"
            _hover={{ bg: "primary.700" }}
            color="neutral.0"
            textStyle="app_reg_12"
            isDisabled={!value}
            isLoading={isLoading}
            onClick={() => console.log("Save Changes")}
          >
            Save Changes
          </Box>
        </Flex>
      )}
    </>
  )
}

export default EditID;