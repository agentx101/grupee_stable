import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import { truncateWallet } from "../util/truncateWallet";
import ClaimIDModal, { Mode } from "./Modal/ClaimIDModal/ClaimIDModal";
import Network from "./Network";
import PendingMultiple from "./PendingMultiple";
import CTAButton from "./CTAButton";
import { WispToken__factory } from "../contracts";
import { ethers } from "ethers";
import { WISP_ETH } from "../util/contracts";

const Header = () => {
  const { web3Provider } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isClaimIDModalOpen, setClaimIDModalOpen] = useState(false);
  const { account, chainId } = useContext(AuthContext);
  const router = useRouter();
  const pathname = router.pathname;


  const requestTestTokens = async () => {
    const wispToken = WispToken__factory.connect(WISP_ETH, web3Provider!.getSigner(0));
    const transaction = await wispToken.mint(ethers.utils.parseEther("100"));
    await transaction.wait(1);
  };

  const title = () => {
    switch (pathname) {
      case "/":
        return "Portfolio";
      case "/transactions":
      default:
        return "Transactions";
    }
  };

  return (
    <>
      <ClaimIDModal
        isOpen={isClaimIDModalOpen}
        onClose={() => setClaimIDModalOpen(false)}
        type={Mode.CLAIM}
      />
      <Box
        p="32px"
        display={{ base: "none", sm: "flex" }}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text color="neutral.800" textStyle="app_bold_28">
          {title()}
        </Text>
        {account && (
          <Flex>
            <Flex columnGap="8px">
              {chainId === "80001" && (
                <Box>
                  <CTAButton
                    name="Request Test ETH"
                    icon="/icons/plus.svg"
                    responsive
                    onClick={requestTestTokens}
                  />
                </Box>
              )}
              <Flex alignItems="center">
                <PendingMultiple/>
              </Flex>
              <Flex alignItems="center">
                <Network/>
              </Flex>
            </Flex>
            <Flex
              // as={Button}
              backgroundColor="transparent"
              columnGap="8px"
              py="8px"
              px="16px"
              // onClick={() => setIsOpen(!isOpen)}
            >
              <Flex justifyContent="center" alignItems="center">
                <Text color="neutral.800" textStyle="app_med_14">{truncateWallet(account, 6)}</Text>
              </Flex>
              {/* <Flex justifyContent="center" alignItems="center">
                <Image
                  src={isOpen ? "/icons/chevron_up.svg" : "/icons/chevron_down.svg"}
                  alt="Chevron Down"
                  width="16px"
                  height="16px"
                />
              </Flex> */}
            </Flex>

            {/* {isOpen && (
              <Box
                position="absolute"
                zIndex={1}
                width="228px"
                mt="12px"
                p="12px"
                borderWidth="1px"
                borderColor="neutral.100"
                borderRadius="12px"
                backgroundColor="neutral.0"
                boxShadow="59px 77px 39px rgba(0, 0, 0, 0.01), 33px 43px 33px rgba(0, 0, 0, 0.02), 15px 19px 24px rgba(0, 0, 0, 0.04), 4px 5px 13px rgba(0, 0, 0, 0.04), 0px 0px 0px rgba(0, 0, 0, 0.04)"
                right="32px"
              >
                <Flex justifyContent="space-between">
                  <Text textStyle="app_med_14" color="neutral.900">
                    Your ID
                  </Text>
                  <Tooltip
                    label="Your URL ID can be used to receive payments privately."
                    placement="top"
                    width="200px"
                    p="12px"
                    borderRadius="12px"
                    textStyle="app_med_10"
                    backgroundColor="neutral.900"
                    color="neutral.0"
                  >
                    <Flex textStyle="app_med_12" color="primary.500" alignItems="center" cursor="default">
                      What is this?
                    </Flex>
                  </Tooltip>
                </Flex>
                <Box
                  as={Button}
                  mt="12px"
                  backgroundColor="primary.500"
                  color="neutral.0"
                  p="8px"
                  borderRadius="6px"
                  width="100%"
                  textStyle="app_med_12"
                  _hover={{ bg: "primary.900" }}
                  onClick={() => {
                    setIsOpen(false);
                    setClaimIDModalOpen(true);
                  }}
                >
                  Claim ID
                </Box>
              </Box>
            )} */}

          </Flex>
        )}
      </Box>
    </>
  );
};

export default Header;
