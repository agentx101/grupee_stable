import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { generatePermanentLinkPath } from "../../util/linkPathCodec";
import { AuthContext } from "../../contexts/AuthContext";

const RequestPermanentLink = (props: any) => {
  const { isOpen, onClose } = props;
  const { sharedKeypair } = useContext(AuthContext);

  const [generatedLink, setGeneratedLink] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const closeTooltip = () => setTimeout(() => setIsCopied(false), 3000);

  const generateLink = async () => {
    setIsLoading(true);
    setGeneratedLink(window.location.origin + "/pay/" + generatePermanentLinkPath(sharedKeypair!));
    setIsLoading(false);
  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setGeneratedLink(undefined);
      }}
    >
      <ModalOverlay/>
      <ModalContent backgroundColor="neutral.100" pb="12px">
        <ModalHeader textStyle="app_med_18" color="neutral.800">
          Permanent Link
        </ModalHeader>
        <ModalCloseButton color="neutral.800"/>
        <ModalBody>
          <Text textStyle="app_reg_12" color="neutral.800">
            Create a permanent payment link
          </Text>

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
            isLoading={isLoading}
            onClick={generateLink}
          >
            Generate link to request payment
          </Box>

          {!!generatedLink && (
            <Box
              mt={"16px"}
              width="100%"
              p="8px"
              borderWidth="1px"
              borderRadius="6px"
              display="flex"
              justifyContent="space-between"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  src="icons/lock.svg"
                  alt="Lock"
                  width="20px"
                  height="20px"
                />
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Text
                  textStyle="app_reg_12"
                  color="neutral.800"
                >{`${generatedLink?.substring(0, 40)}...`}</Text>
              </Box>
              <Tooltip
                label="Copied"
                placement="top"
                hasArrow
                arrowSize={8}
                offset={[0, 15]}
                isOpen={isCopied}
                onOpen={closeTooltip}
              >
                <Box
                  as={Button}
                  borderRadius="6px"
                  backgroundColor="primary.800"
                  leftIcon={
                    <Image
                      src="icons/copy.svg"
                      alt="Copy"
                      width="16px"
                      height="16px"
                    />
                  }
                  color="neutral.0"
                  _hover={{ bg: "primary.700" }}
                  textStyle="app_reg_14"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink);
                    setIsCopied(true);
                  }}
                >
                  Copy
                </Box>
              </Tooltip>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RequestPermanentLink;
