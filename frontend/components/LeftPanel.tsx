import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import WalletIcon from "./Icons/WalletIcon";
import TransactionIcon from "./Icons/TransactionIcon";

export const defaultGradient = `linear-gradient(152.47deg, #385CD9 42.36%, #147BDA 73.79%)`;
export const polygonGradient = `linear-gradient(152.47deg, #661DDF 42.36%, #8147E5 73.79%)`;
export const ethereumGradient = `linear-gradient(152.47deg, #141414 42.36%, #343434 73.79%)`;

const LeftPanel = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const { disconnect, chainId } = useContext(AuthContext);

  const gradient = 
    chainId === "1"
      ? ethereumGradient
      : chainId === "137"
        ? polygonGradient
        : defaultGradient;

  return (
    <Box
      width="224px"
      py="24px"
      px="16px"
      height="100vh"
      background={gradient}
      display={{
        base: "none",
        md: "flex"
      }}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        display={{
          base: "none",
          md: "flex"
        }}
        flexDirection="column"
      >
        <Link m="12px" onClick={() => router.push(`/`)}>
          <Box textAlign="center" p="8px">
            <Image
              src="/icons/logo-md-light.svg"
              alt="Wisp Logo"
              mx="auto"
            />
          </Box>
        </Link>
        <Flex direction="column" mt="24px">
          <Box
            as={Button}
            borderRadius="6px"
            py="12px"
            textAlign="center"
            leftIcon={
              <WalletIcon
                color={pathname === "/" ? "primary.500" : "neutral.0"}
                boxSize="28px"
              />
            }
            backgroundColor={pathname === "/" ? "neutral.0" : "transparent"}
            _hover={{ bg: pathname === "/" ? "neutral.0" : "primary.400" }}
            onClick={() => router.push(`/`)}
          >
            <Text mr="auto" ml="16px" color={pathname === "/" ? "primary.700" : "neutral.0"} textStyle="app_reg_14">
              Portfolio
            </Text>
          </Box>

          <Box
            as={Button}
            borderRadius="6px"
            mt="12px"
            py="12px"
            textAlign="center"
            leftIcon={
              <TransactionIcon
                color={pathname === "/transactions" ? "primary.500" : "neutral.0"}
                boxSize="28px"
              />
            }
            backgroundColor={pathname === "/transactions" ? "neutral.0" : "transparent"}
            _hover={{ bg: pathname === "/transactions" ? "neutral.0" : "primary.400" }}
            onClick={() => router.push(`/transactions`)}
          >
            <Text mr="auto" ml="16px" color={pathname === "/transactions" ? "primary.700" : "neutral.0"} textStyle="app_reg_14">
              Transactions
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
          as={Button}
          borderRadius="6px"
          mt="12px"
          py="12px"
          textAlign="center"
          leftIcon={
            <Image
              src="/icons/leave.svg"
              alt="Transactions Icon"
              width="24px"
              height="24px"
            />
          }
          backgroundColor="transparent"
          _hover={{ bg: "primary.400" }}
          onClick={() => disconnect()}
        >
          <Text mr="auto" color="neutral.0" textStyle="app_reg_14">
            Log out
          </Text>
        </Box>
    </Box>
  );
};

export default LeftPanel;
