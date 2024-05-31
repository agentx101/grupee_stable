import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const Wallet = (props: any) => {
  const { account, connectWallet, disconnect, isLoading } = props;

  return (
    <>
      <Box>
        {!account ? (
          <Box
            as={Button}
            backgroundColor="#1c3db6"
            borderRadius="6px"
            py="12px"
            height="34px"
            textAlign="center"
            _hover={{ bg: "#2748c1" }}
            onClick={async ()=>{
              
              console.log("Hello world")
              await connectWallet()
            } }
            isLoading={isLoading}
          >
            <Text ml="auto" mr="auto" color="white" textStyle="app_reg_12">
              Connect Wallet
            </Text>
          </Box>
        ) : (
          <Box
            as={Button}
            backgroundColor="#1c3db6"
            borderRadius="6px"
            py="12px"
            textAlign="center"
            ml="36px"
            _hover={{ bg: "#2748c1" }}
            onClick={disconnect}
            isLoading={isLoading}
          >
            <Text ml="auto" mr="auto" color="white" textStyle="app_reg_12">
              Disconnect
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Wallet;
