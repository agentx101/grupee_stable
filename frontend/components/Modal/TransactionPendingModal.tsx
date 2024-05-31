
import {
  Box,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/animations/loading.json";
import { TransactionContext } from "../../contexts/TransactionContext";

const TransactionPendingModal = () => {
  const { isPendingModalOpen, setIsPendingModalOpen, transactionHash } = useContext(TransactionContext);

  return (
    <Modal
      isCentered
      isOpen={isPendingModalOpen}
      onClose={() => setIsPendingModalOpen(false)}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="neutral.100" pb="12px">
        <ModalHeader textStyle="app_med_18" color="neutral.800">
          Pending Approval
        </ModalHeader>
        <ModalCloseButton color="neutral.800" />
        <ModalBody>
          <Flex justifyContent="center">
            <Box width="250px">
              <Lottie
                animationData={loadingAnimation}
                loop={true}
              />
            </Box>
          </Flex>
          <Box mt="8px" textAlign="center" textStyle="app_med_18" color="neutral.800">
            Waiting For Confirmation
          </Box>
          <Box mt="16px" mb="24px" textAlign="center" textStyle="app_reg_14" color="neutral.600">
            <Link href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} textDecoration="underline" isExternal>View on Explorer</Link>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TransactionPendingModal;