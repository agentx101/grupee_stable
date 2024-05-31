import {
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from 'next/router'
import PaymentPermanent from "../../components/Payment/PaymentPermanent";
import PaymentOneTime from "../../components/Payment/PaymentOneTime";
import Network from "../../components/Network";
import Pending from "../../components/Pending";
import TransactionPendingModal from "../../components/Modal/TransactionPendingModal";

const Request = () => {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <TransactionPendingModal />
      <Box backgroundColor="primary.0" height="100vh">
        <Flex position="fixed" right="0px" height="48px">
          <Flex columnGap="8px">
            <Flex alignItems="center">
              <Pending />
            </Flex>
            <Flex alignItems="center">
              <Network />
            </Flex>
          </Flex>
        </Flex>
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Box display="flex" justifyContent="center">
              <Box as="button" onClick={() => router.push("/")}>
                <Image src="/icons/logo-md.svg" alt="logo" width="72px" height="45px"/>
              </Box>
            </Box>
            <Box
              width="400px"
              backgroundColor="neutral.100"
              borderRadius="6px"
              mt="32px"
            >
              {
                id && (id as string).length === 128 ?
                  <PaymentPermanent id={id as string}/> :
                  <PaymentOneTime id={id as string}/>
              }
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Request;
