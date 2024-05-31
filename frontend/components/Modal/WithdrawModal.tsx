import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Token, tokens } from "../../util/tokens";
import Conversion from "../Conversion";

const WithdrawModal = (props: any) => {
  const { isOpen, onClose } = props;

  const [value, setValue] = useState<number | undefined>(undefined);
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetFields = () => {
    setValue(undefined);
    setSelectedToken(undefined);
  };

  const handleValueChange = (event: any) => setValue(event.target.value);

  const token = (token: Token) => {
    return (
      <Box flexDirection="row" display="flex">
        <Box>
          <Image
            src={`icons/${token.symbol.toLowerCase()}_logo.svg`}
            alt={`${token.name} Logo`}
            width="24px"
            height="24px"
          />
        </Box>
        <Text color="neutral.800" textStyle="app_reg_14" ml="8px" mt="2px">
          {token.name + ` (${token.symbol})`}
        </Text>
      </Box>
    );
  };

  const withdraw = async () => {
    if (!selectedToken || !value) {
      return;
    }

    setIsLoading(true);
    const amount = ethers.utils.parseEther(value.toString());
    resetFields();
    setIsLoading(false);
  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetFields();
      }}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="neutral.100" pb="12px">
        <ModalHeader textStyle="app_med_18" color="neutral.800">
          Withdraw
        </ModalHeader>
        <ModalCloseButton color="neutral.800" />
        <ModalBody>
          <Text textStyle="app_reg_12" color="neutral.800">
            Withdraw to your wallet
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              mt="32px"
              width="100%"
              textAlign={"left"}
              color="neutral.800"
              backgroundColor="neutral.0"
              _hover={{ bg: "neutral.50" }}
              _active={{ bg: "neutral_800" }}
              rightIcon={
                <Image
                  src="/icons/chevron_down.svg"
                  alt="Chevron Down"
                  width="16px"
                  height="16px"
                />
              }
            >
              {!!selectedToken ? token(selectedToken) : "Select Token"}
            </MenuButton>
            <MenuList backgroundColor="neutral.0" borderWidth="0px">
              {
                tokens.map(it => {
                  return (
                    <MenuItem
                      key={it.address}
                      _hover={{ bg: "neutral.50" }}
                      _focus={{ bg: "neutral_800" }}
                      onClick={() => setSelectedToken(it)}
                    >
                      { token(it) }
                    </MenuItem>
                  );
                })
              }
            </MenuList>
          </Menu>

          <Input
            mt="16px"
            value={value}
            placeholder="0"
            color="neutral.800"
            borderWidth="0px"
            backgroundColor="neutral.0"
            isDisabled={!selectedToken}
            onChange={handleValueChange}
          />
          
          <Conversion
            selectedToken={selectedToken}
            value={value}
          />

          <Box
            as={Button}
            mt={"16px"}
            backgroundColor="primary.800"
            borderRadius="6px"
            py="12px"
            width="100%"
            textAlign="center"
            leftIcon={
              <Image
                src="icons/chain.svg"
                alt="Chevron Down"
                width="16px"
                height="16px"
              />
            }
            _hover={{ bg: "primary.700" }}
            color="neutral.0"
            textStyle="app_reg_14"
            isDisabled={!selectedToken || !value}
            isLoading={isLoading}
            onClick={withdraw}
          >
            Withdraw
          </Box>

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawModal;
