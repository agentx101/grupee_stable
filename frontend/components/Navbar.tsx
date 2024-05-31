import { Flex, Text, Image, Link, Button, Box, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { MenuItem } from '../pages';
import { truncateWallet } from '../util/truncateWallet';
import { defaultGradient, ethereumGradient, polygonGradient } from './LeftPanel';
import ClaimIDModal from './Modal/ClaimIDModal/ClaimIDModal';
import Wallet from './Wallet';
import {kit} from "../services/WalletConnect";

const Navbar = (props: any) => {
  const router = useRouter();
  const pathname = router.asPath;

  const { account, chainId,connectWallet, disconnect, isWalletLoading } = useContext(AuthContext);
  // async function connectWallet(){
   
  //   console.log("connecting wallet")
  //   await kit.openModal({
  //     onWalletSelected: async (option ) => {
  //       kit.setWallet(option.id);
  //       const publicKey = await kit.getPublicKey();
  //     // Do something else
  //     }
  //   })
  // }
  const { menuItems, isMobileOnly, title, isLandingPage} = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState(menuItems[0]);

  const [isClaimIDModalOpen, setClaimIDModalOpen] = useState(false);

  const gradient = 
    chainId === "1"
      ? ethereumGradient
      : chainId === "137"
        ? polygonGradient
        : defaultGradient;


  const contentWidths = {
    base: "calc(100% - 64px)",
    lg: "1008px"
  };

  return (
    <>
      <ClaimIDModal
        isOpen={isClaimIDModalOpen}
        onClose={() => setClaimIDModalOpen(false)}
      />
      <Flex
        width="100%"
        height={{ base: "82px", lg: "72px", xl: "86px"}}
        backgroundColor={isLandingPage ? "neutral.0" : "primary.500"}
        align="center"
        justify="space-between"
        py="12px"
        px={{base: "32px", lg: "64px", xl: "96px", xxl: "156px"}}
        position="fixed"
        zIndex={10}
        display={isMobileOnly ? { base: "flex", md: "none" } : "flex"}
        borderBottomWidth="1px"
        borderBottomColor="neutral.300"
      >
        {/* Logo */}
        <Link onClick={() => router.push(`/`)}>
          <Image
            src="/icons/logo-md.svg"
            alt="Wisp Logo"
            display={{ base: "none", md: "block" }}
            width={{ base: "50px", lg: "50px" }}
            mr="30px"
          />
          <Image
            src={isLandingPage ? "/icons/logo-md.svg" : "/icons/logo-md.svg"}
            alt="Wisp Logo"
            display={{ base: "block", md: "none" }}
          />
        </Link>

        {/* Title */}
        <Text
          textStyle="app_med_18"
          display={{ base: "block", md: "none" }}
          color={isLandingPage ? "red.light" : "neutral.0"}
        >
          {!isLandingPage && title}
        </Text>

        {/* Menu Items */}
        <Flex align="center" flex="1" display={{ base: "none", md: "flex" }} justifyContent="space-between" ml="24px">
          <Flex columnGap="36px">
            {menuItems.map((el: MenuItem, index: number) => {
              return (
                <Link
                  key={index}
                  href={el.path}
                  textStyle={{ base: "land_reg_14", lg: "land_med_14" }}
                  color={menu === el.name ? "neutral.800" : "neutral.500"}
                  _hover={{ textDecoration: "none" }}
                  onClick={() => setMenu(el.name)}
                >
                  {el.name}
                </Link>
              )
            })}
          </Flex>
          <Box>
            <Wallet
              account={account}
              connectWallet={connectWallet}
              disconnect={disconnect}
              isLoading={isWalletLoading}
            />
          </Box>
        </Flex>


        <Button
          backgroundColor="transparent"
          w="36px"
          h="36px"
          p="0"
          display={{ base: "block", md: "none" }}
          _hover={{ bg: "primary.900" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Image
            w="20px"
            h="20px"
            mx="auto"
            src={isLandingPage ? "/icons/hamburger-icon.svg" : "/icons/hamburger-icon-light.svg"}
            alt="Hamburger menu"
          />
        </Button>

      </Flex>
      {menuOpen && (
        <Flex
          w="100vw"
          h="100vh"
          position="fixed"
          top="0"
          left="0"
          background={gradient}
          direction="column"
          align="center"
          zIndex={10}
        >
          <Flex
            width={contentWidths}
            height="82px"
            backgroundColor="transparent"
            borderRadius="6px"
            align="center"
            justify="space-between"
          >
            <Image
              src="/icons/logo-sm-light.svg"
              alt="Wisp Logo"
              display={{ base: "block", md: "none" }}
            />
            <Text
              textStyle="app_med_18"
              display={{ base: "block", md: "none" }}
              color="neutral.0"
            >
              {account ? truncateWallet(account, 6) : null}
            </Text>
            <Button
              backgroundColor="neutral.0"
              w="36px"
              h="36px"
              p="0"
              display={{ base: "block", md: "none" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Image
                w="20px"
                h="20px"
                mx="auto"
                src="/icons/close-icon.svg"
                alt="Hamburger icon"
              />
            </Button>
          </Flex>
          <Flex direction="column" width={contentWidths} columnGap="12px">
            <Box width="100%" borderBottomWidth="1px" color="primary.400" opacity={0.2} />
            <Box
              display="flex"
              flexDirection="column"
            >
              <Flex direction="column" mt="24px" gap="12px">
                {menuItems.map((el: MenuItem, index: number) => {
                  return (
                    <Box
                      key={index}
                      as={Button}
                      borderRadius="6px"
                      py="24px"
                      textAlign="center"
                      leftIcon={el.icon(pathname === el.path ? "primary.500" : "neutral.0")}
                      backgroundColor={pathname === el.path ? "neutral.0" : "transparent"}
                      _hover={{ bg: pathname === el.path ? "neutral.0" : "primary.900" }}
                      onClick={() => router.push(el.path)}
                    >
                      <Text mr="auto" ml="16px" color={pathname === el.path ? "primary.700" : "neutral.0"} textStyle="app_reg_14">
                        {el.name}
                      </Text>
                    </Box>
                    )
                })}
                
                {!isLandingPage && (
                  <>
                    <Box
                      as={Button}
                      borderRadius="6px"
                      mt="12px"
                      py="24px"
                      textAlign="center"
                      leftIcon={
                        <Image
                          src="/icons/leave.svg"
                          alt="Transactions Icon"
                          width="28px"
                          height="28px"
                        />
                      }
                      backgroundColor="transparent"
                      _hover={{ bg: "primary.900" }}
                      onClick={() => disconnect()}
                    >
                      <Text mr="auto" ml="16px" color="neutral.0" textStyle="app_reg_14">
                        Log out
                      </Text>
                    </Box>

                    {/* <Box my="24px" borderBottomWidth="1px" color="primary.400" opacity={0.2} /> */}

                    {/* <Box>
                      <Flex justifyContent="space-between">
                        <Flex textStyle="app_med_14" color="neutral.0" justifyContent="center" alignItems="center">Your ID</Flex>
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
                          <Flex
                            textStyle="app_med_14"
                            color="neutral.0"
                            alignItems="center"
                            cursor="default"
                          >What is this?</Flex>
                        </Tooltip>
                      </Flex>
                      <Flex
                        as={Button}
                        mt="12px"
                        width="100%"
                        p="8px"
                        borderRadius="8px"
                        borderWidth="1px"
                        borderColor="primary.300"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="transparent"
                        _hover={{ bg: "primary.900", borderColor: "transparent" }}
                        onClick={() => setClaimIDModalOpen(true)}
                      >
                        <Text textStyle="app_med_14" color="neutral.0">Claim ID</Text>
                      </Flex>
                    </Box> */}
                  </>
                )}
              </Flex>

            </Box>
            {isLandingPage && (
              <Box ml="auto" mr="auto" mt="24px">
                <Wallet
                  account={account}
                  connectWallet={connectWallet}
                  disconnect={disconnect}
                  isLoading={isWalletLoading}
                />
              </Box>
            )}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default Navbar;