import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import EditID from "./EditID";
import ClaimID from "./ClaimID";
import YourID from "./YourID";

export enum Mode {
  CLAIM,
  YOUR_ID,
  EDIT
}

const ClaimIDModal = (props: any) => {
  const { isOpen, onClose } = props;
  const id = "andrew";
  const [mode, setMode] = useState<Mode>(Mode.YOUR_ID);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="neutral.0" pb="12px">
        <ModalHeader textStyle="app_med_18" color="neutral.800">
          {mode === Mode.CLAIM
            ? 'Claim Personal ID'
            : mode === Mode.YOUR_ID
              ? 'Your ID'
              : 'Edit ID'
          }
        </ModalHeader>
        <ModalCloseButton color="neutral.800" />
        <ModalBody>
          <Text textStyle="app_reg_12" color="neutral.800">
            This ID can be used to receive payment using crypto wallet. The ID will be used to create a permanent link to receive payment for ex. wisp.finance/name
          </Text>

          {mode === Mode.CLAIM && <ClaimID setMode={setMode}/>}
          {mode === Mode.YOUR_ID && <YourID setMode={setMode} id={id} />}
          {mode === Mode.EDIT && <EditID setMode={setMode} id={id} />}
          

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClaimIDModal;
