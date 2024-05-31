import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

const WhyWisp = () => {
  const contentWidths = {
    base: "343px",
    sm: "544px",
    md: "768px",
    lg: "1008px",
    xl: "1088px",
    xxl: "1088px",
  };

  return (
    <>
      <Box
        id="why-wisp"
        backgroundColor="neutral.50"
        padding="4px 12px"
        borderRadius="6px"
        mt="100px"
      >
        <Text
          textStyle="land_reg_14"
          color="neutral.500"
        >
          Why Wisp
        </Text>
      </Box>
      <Text
        textStyle={{ base: "land_semibold_32", md: "land_semibold_36", lg: "land_semibold_48" }}
        color="neutral.900"
        mt="16px"
        textAlign="center"
      >
        Private, Profitable & Simple
      </Text>
      <Text
        textStyle={{ base: "app_reg_14", md: "app_reg_18"}}
        color="neutral.500"
        mt="16px"
        textAlign="center"
      >
        End-to-end private crypto payments without revealing your address <br /> and
        financial management in a single solution.
      </Text>
      <Flex
        mt="56px"
        mb="154px"
        width={contentWidths}
        justifyContent="space-between"
        direction={{ base: "column", lg: "row" }}
        maxW={contentWidths}
        gap={{ base: "24px", lg: "0px" }}
      >
        <Flex
          backgroundColor="primary.0"
          padding="28px"
          direction="column"
          alignItems="center"
          justify="space-between"
          borderRadius="12px"
          minWidth="330px"
        >
          <Image
            src="/images/why-wisp-wallet.svg"
            alt="Wisp wallet"
            width="120px"
          />
          <Text textStyle={{ base: "land_semibold_20", md: "land_semibold_24" }} mt="28px" color="neutral.900">
            Payment & Transactions
          </Text>
          <Text
            textStyle="app_med_14"
            lineHeight="165%"
            mt="16px"
            color="neutral.500"
            textAlign="center"
          >
            Paying & requesting payments have 
            <br />never been easier. Wisp keeps 
            <br />a record of all your transactions.
          </Text>
        </Flex>

        <Flex
          backgroundColor="primary.0"
          padding="28px"
          direction="column"
          alignItems="center"
          justify="space-between"
          borderRadius="12px"
          minWidth="330px"
        >
          <Image
            src="/images/why-wisp-liquidity.svg"
            alt="Wisp liquidity"
            width="75px"
          />
          <Text textStyle={{ base: "land_semibold_20", md: "land_semibold_24" }} mt="28px" color="neutral.900">
            Liquidity Pool
          </Text>
          <Text
            textStyle="app_med_14"
            lineHeight="165%"
            mt="16px"
            color="neutral.500"
            textAlign="center"
          >
            Wisp passively reinvests <br /> your money for APY gains.
          </Text>
        </Flex>

        <Flex
          backgroundColor="primary.0"
          padding="28px"
          direction="column"
          alignItems="center"
          justify="space-between"
          borderRadius="12px"
          minWidth="330px"
        >
          <Image
            src="/images/why-wisp-docs.svg"
            width="120px"
            alt="Wisp docs"
          />
          <Text textStyle={{ base: "land_semibold_20", md: "land_semibold_24" }} mt="28px" color="neutral.900">
            Compliance
          </Text>
          <Text
            textStyle="app_med_14"
            lineHeight="165%"
            mt="16px"
            color="neutral.500"
            textAlign="center"
          >
            Wisp helps you stay compliant <br />
            with the law for all transactions.
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default WhyWisp;