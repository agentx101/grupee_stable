import React from 'react';
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { gradient } from './Jumbotron';
import { Color1, Color2, Color3, Color4 } from '../../pages';

const HowItWorks = () => {
  const gradientAnimation = `${gradient} 15s ease infinite`;

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
      <Text
        id="how-it-works"
        mt="100px"
        mb={{ base: "0px", lg: "24px" }}
        textStyle={{ base: "land_semibold_32", md: "land_semibold_36" }}
        color="neutral.900"
      >
        How it works
      </Text>
      <Flex
        mt="35px"
        width={contentWidths}
        direction="column"
        position="relative"
        gap="92px"
      >
        <Flex
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "unset" }}
        >
          <Flex direction="column" align={{ base: "center", md: "unset" }}>
            <Box
              h="84px"
              marginBottom="20px"
              display={{ base: "block", md: "none" }}
            >
              <Flex
                w="1"
                height="100%"
                borderLeftWidth="2px"
                borderStyle="dashed"
                borderColor="neutral.300"
                direction="column"
                justify="center"
              >
                <Box
                  w="36px"
                  height="36px"
                  borderRadius="24px"
                  backgroundColor="neutral.0"
                  textAlign="center"
                  lineHeight="36px"
                  verticalAlign="center"
                  fontSize="18px"
                  transform="translateX(-50%)"
                  color="neutral.900"
                  borderWidth="1px"
                  borderColor="neutral.200"
                >
                  1
                </Box>
              </Flex>
            </Box>
            <Text
              textStyle={{ base: "land_med_14", lg: "land_semibold_16"}}
              color="primary.700"
              mb="4px"
              textAlign={{ base: "center", md: "unset" }}
            >
              CONNECT WALLET
            </Text>
            <Text
              textStyle={{ base: "land_semibold_24", lg: "land_semibold_32" }}
              color="neutral.900"
              mb={{ base: "16px", md: "12px" }}
              textAlign={{ base: "center", md: "unset" }}
            >
              Scan the QR code and <br /> pay from CBDC application
            </Text>
            <Text
              textStyle={{ base: "land_reg_14", lg: "land_med_16" }}
              color="neutral.600"
              mb={{ base: "24px", md: "12px" }}
              textAlign={{ base: "center", md: "unset" }}
            >
              Scan from any CBDC application of your choice. 
            </Text>
            {/* <Link
              href="#"
              textStyle="land_med_16"
              color="primary.700"
              verticalAlign="center"
              display="flex"
              alignItems="center"
              textAlign={{ base: "center", md: "unset" }}
              mb={{ base: "38px", md: "unset" }}
            >
              Get started
              <Image
                src="/icons/blue-arrow.svg"
                alt="blue arrow right"
                display="inline-block"
              />
            </Link> */}
          </Flex>
          <Flex
            position="relative"
            justifyContent="center"
            alignItems="flex-end"
            width="320px"
            height="256px"
            borderRadius="12px"
            background={`linear-gradient(-45deg, ${Color1}, ${Color2}, ${Color3}, ${Color4})`}
            backgroundSize= "400% 400%"
            animation={gradientAnimation}
          >
            <Image
              src="/images/connect-wallet.svg"
              alt="how it works wallet"
              w={{ base: "280px", md: "unset" }}
            />
          </Flex>
        </Flex>

        <Flex
          justify="space-between"
          direction={{ base: "column", md: "row-reverse" }}
          align={{ base: "center", md: "unset" }}
        >
          <Flex direction="column" align={{ base: "center", md: "unset" }}>
            <Box
              h="84px"
              marginBottom="20px"
              display={{ base: "block", md: "none" }}
            >
              <Flex
                w="1"
                height="100%"
                borderLeftWidth="2px"
                borderStyle="dashed"
                borderColor="neutral.300"
                direction="column"
                justify="center"
              >
                <Box
                  w="36px"
                  height="36px"
                  borderRadius="24px"
                  backgroundColor="neutral.0"
                  textAlign="center"
                  lineHeight="36px"
                  verticalAlign="center"
                  fontSize="18px"
                  transform="translateX(-50%)"
                  color="neutral.900"
                  borderWidth="1px"
                  borderColor="neutral.200"
                >
                  2
                </Box>
              </Flex>
            </Box>
            <Text
              textStyle={{ base: "land_med_14", lg: "land_semibold_16"}}
              color="primary.700"
              mb="4px"
              textAlign={{ base: "center", md: "unset" }}
            >
              CREATE LINK
            </Text>
            <Text
              textStyle={{ base: "land_semibold_24", lg: "land_semibold_32" }}
              color="neutral.900"
              mb={{ base: "16px", md: "12px" }}
              textAlign={{ base: "center", md: "unset" }}
            >
              Get gRupee in the <br />
              wallet of your choice
            </Text>
            <Text
              textStyle={{ base: "land_reg_14", lg: "land_med_16" }}
              color="neutral.600"
              mb={{ base: "24px", md: "12px" }}
              textAlign={{ base: "center", md: "unset" }}
            >
              You will receive stablecoin pegged to gRupee <br />
              onto wallet of your choice on XLM chain. 
            </Text>
            {/* <Link
              href="#"
              textStyle="land_med_16"
              color="primary.700"
              verticalAlign="center"
              display="flex"
              alignItems="center"
              textAlign={{ base: "center", md: "unset" }}
              mb={{ base: "38px", md: "unset" }}
            >
              Get started
              <Image
                src="/icons/blue-arrow.svg"
                alt="blue arrow right"
                display="inline-block"
                ml="16px"
              />
            </Link> */}
          </Flex>
          <Flex
            position="relative"
            justifyContent="center"
            alignItems="center"
            width="320px"
            height="256px"
            borderRadius="12px"
            background={`linear-gradient(-45deg, ${Color1}, ${Color2}, ${Color3}, ${Color4})`}
            backgroundSize= "400% 400%"
            animation={gradientAnimation}
          >
            <Image
              src="/images/request-one-time.svg"
              alt="how it works request"
              w={{ base: "243px", md: "unset" }}
            />
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "unset" }}
        >
          <Flex direction="column" align={{ base: "center", md: "unset" }}>
            <Box
              h="84px"
              marginBottom="20px"
              display={{ base: "block", md: "none" }}
            >
              <Flex
                w="1"
                height="100%"
                borderLeftWidth="2px"
                borderStyle="dashed"
                borderColor="neutral.300"
                direction="column"
                justify="center"
              >
                <Box
                  w="36px"
                  height="36px"
                  borderRadius="24px"
                  backgroundColor="neutral.0"
                  textAlign="center"
                  lineHeight="36px"
                  verticalAlign="center"
                  fontSize="18px"
                  transform="translateX(-50%)"
                  color="neutral.900"
                  borderWidth="1px"
                  borderColor="neutral.200"
                >
                  3
                </Box>
              </Flex>
            </Box>
            <Text
              textStyle={{ base: "land_med_14", lg: "land_semibold_16"}}
              color="primary.700"
              mb="4px"
              textAlign={{ base: "center", md: "unset" }}
            >
              SHARE
            </Text>
            <Text
              textStyle={{ base: "land_semibold_24", lg: "land_semibold_32" }}
              color="neutral.900"
              mb={{ base: "16px", md: "12px" }}
              textAlign={{ base: "center", md: "unset" }}
            >
              Send link
            </Text>
            <Text
              textStyle={{ base: "land_reg_14", lg: "land_med_16" }}
              color="neutral.600"
              mb={{ base: "24px", md: "12px" }}
              textAlign={{ base: "center", md: "unset" }}
            >
              Copy and send link to the <br />
              recipient to request payment
            </Text>
            {/* <Link
              href="#"
              textStyle="land_med_16"
              color="primary.700"
              verticalAlign="center"
              display="flex"
              alignItems="center"
              textAlign={{ base: "center", md: "unset" }}
              mb={{ base: "38px", md: "unset" }}
            >
              Get started
              <Image
                src="/icons/blue-arrow.svg"
                alt="blue arrow right"
                display="inline-block"
                ml="16px"
              />
            </Link> */}
          </Flex>
          <Flex
            position="relative"
            justifyContent="center"
            alignItems="center"
            width="320px"
            height="256px"
            borderRadius="12px"
            background={`linear-gradient(-45deg, ${Color1}, ${Color2}, ${Color3}, ${Color4})`}
            backgroundSize= "400% 400%"
            animation={gradientAnimation}
          >
            <Image
              src="/images/send-link.svg"
              alt="how it works request"
              w={{ base: "248px", md: "unset" }}
            />
          </Flex>
        </Flex>

        {/*Steps*/}
        <Flex
          w="1"
          height="80%"
          borderLeftWidth="2px"
          borderStyle="dashed"
          borderColor="neutral.300"
          direction="column"
          justify="space-between"
          position="absolute"
          top="10%"
          left="50%"
          display={{ base: "none", md: "flex" }}
        >
          <Box
            w="36px"
            height="36px"
            borderRadius="24px"
            backgroundColor="neutral.0"
            textAlign="center"
            lineHeight="36px"
            verticalAlign="center"
            fontSize="18px"
            transform="translateX(-50%)"
            color="neutral.900"
            borderWidth="1px"
            borderColor="neutral.200"
          >
            1
          </Box>
          <Box
            w="36px"
            height="36px"
            borderRadius="24px"
            backgroundColor="neutral.0"
            textAlign="center"
            lineHeight="36px"
            verticalAlign="center"
            fontSize="18px"
            transform="translateX(-50%)"
            color="neutral.900"
            borderWidth="1px"
            borderColor="neutral.200"
          >
            2
          </Box>
          <Box
            w="36px"
            height="36px"
            borderRadius="24px"
            backgroundColor="neutral.0"
            textAlign="center"
            lineHeight="36px"
            verticalAlign="center"
            fontSize="18px"
            transform="translateX(-50%)"
            color="neutral.900"
            borderWidth="1px"
            borderColor="neutral.200"
          >
            3
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default HowItWorks;