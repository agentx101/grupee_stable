import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BigNumber, ethers, utils } from "ethers";
import { Token, tokens } from "../../util/tokens";
import { AuthContext } from "../../contexts/AuthContext";
import { TransactionContext, Transaction, TransactionType, TransactionStatus } from "../../contexts/TransactionContext";

import { ERC20__factory, Wisp__factory } from "../../contracts";
import { WISP_CONTRACT } from "../../util/contracts";
import { getDepositData } from "../../util/deposit";
import Conversion from "../Conversion";
import PaymentStatus, { Payment } from "../Payment/PaymentStatus";

const DepositModal = (props: any) => {
  const { isOpen, onClose } = props;

  const { web3Provider, personalKeypair, account } = useContext(AuthContext);
  const {
    setTransactionHash,
    transactionHash,
    multiplePendingTransactions,
    setMultiplePendingTransactionsStorage,
    depositApproving
  } = useContext(TransactionContext);

  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [value, setValue] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(undefined);
  const [allowance, setAllowance] = useState<BigNumber | undefined>(undefined);
  const [isLoadingAllowance, setIsLoadingAllowance] = useState<boolean>(false);

  const resetFields = () => {
    if(!isApproving && !isConfirming) {
      setValue(undefined);
      setError("");
      setSelectedToken(undefined);
      setTransactionHash(undefined);
      setIsSubmitted(false);
      setIsApproving(false);
      setIsConfirming(false);
    }
  };

  const handleValueChange = (event: any) => setValue(event.target.value);

  const token = (token: Token) => {
    return (
      <Box flexDirection="row" display="flex">
        <Box>
          <Image
            src={`icons/${token.symbol.toLowerCase()}_logo.svg`}
            alt={`${token.name} Logo`}
            width="24px"
            height="24px"
          />
        </Box>
        <Text color="neutral.800" textStyle="app_reg_14" ml="8px" mt="2px">
          {token.name + ` (${token.symbol})`}
        </Text>
      </Box>
    );
  };

  const loadAllowance = () => {
    if (!selectedToken || !web3Provider || !account) {
      return;
    }

    setIsLoadingAllowance(true);
    const tokenContract = ERC20__factory.connect(selectedToken.address, web3Provider.getSigner(0));
    tokenContract.allowance(account, WISP_CONTRACT)
      .then(allowance => {
        setAllowance(allowance);
      })
      .catch(err => {
        console.log(err);
        setError(`Failed to retrieve user allowance for ${selectedToken.symbol}.`);
        setSelectedToken(undefined);
      })
      .finally(() => setIsLoadingAllowance(false));
  }

  useEffect(() => {
    loadAllowance();
  }, [selectedToken, web3Provider, account]);

  const approvalNeeded = (value: string | undefined): boolean => {
    const smallAllowance = allowance && utils.formatEther(allowance);
    const isApprovalNeeded = !!selectedToken && !!value && !!smallAllowance && Number(smallAllowance) < Number(value);
    
    return isApprovalNeeded;
  }

  const approvePayment = async () => {
    if (!selectedToken || !web3Provider || !value) {
      return
    }

    try {
      setIsApproving(true);
      const valueAsBigNumber = ethers.utils.parseEther(value); // TODO: change to 1000000000000000000000
      const tokenContract = ERC20__factory.connect(selectedToken.address, web3Provider.getSigner(0));
      const transaction = await tokenContract.approve(WISP_CONTRACT, valueAsBigNumber);
      setAllowance(valueAsBigNumber);

      const transactionApproving: Transaction = {
        type: TransactionType.Deposit,
        status: TransactionStatus.Approving,
        hash: transaction.hash,
      };
      setMultiplePendingTransactionsStorage([...multiplePendingTransactions, transactionApproving]);

      const result = await web3Provider.waitForTransaction(transaction.hash);
      if(result.status) {
        const removePendingTransaction = multiplePendingTransactions.filter(el => el.hash !== transaction.hash);
        setMultiplePendingTransactionsStorage(removePendingTransaction);
        setIsApproved(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      loadAllowance();
      setIsApproving(false);
    }
  }

  const executePayment = async () => {
    if (!selectedToken || !web3Provider || !value || !personalKeypair) {
      return;
    }
    const valueAsBigNumber = ethers.utils.parseEther(value);
    const depositData = await getDepositData(personalKeypair, valueAsBigNumber, selectedToken.address);
    const wisp = Wisp__factory.connect(WISP_CONTRACT, web3Provider.getSigner(0));

    try {
      setIsConfirming(true);
      const transaction = await wisp.deposit(
        depositData.proof,
        depositData.commitment,
        "0x" + Buffer.from(depositData.publicKey).toString("hex"),
        "0x" + Buffer.from(depositData.amount).toString("hex"),
        "0x" + Buffer.from(depositData.token).toString("hex"),
        "0x" + depositData.encryptedData.toString("hex")
      );

      setTransactionHash(transaction?.hash);
      const transactionConfirming: Transaction = {
        type: TransactionType.Deposit,
        status: TransactionStatus.Confirming,
        hash: transaction.hash,
      };
      setMultiplePendingTransactionsStorage([...multiplePendingTransactions, transactionConfirming]);
      setIsSubmitted(true);

      const result = await web3Provider.waitForTransaction(transaction.hash);
      if (result.status) {
        const removePendingTransaction = multiplePendingTransactions.filter(el => el.hash !== transaction.hash);
        setMultiplePendingTransactionsStorage(removePendingTransaction);
      }
    } catch (err: any) {
      setError(err.reason);
    } finally {
      setIsConfirming(false);
    }
  }
  
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetFields();
      }}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="neutral.100" pb="12px">
        <ModalHeader textStyle="app_med_18" color="neutral.800">
          Deposit
        </ModalHeader>
        <ModalCloseButton color="neutral.800" />
        <ModalBody>
          {!isSubmitted && (
            <>
              <Text textStyle="app_reg_12" color="neutral.800">
                Deposit to your Wisp account.
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  mt="32px"
                  width="100%"
                  textAlign={"left"}
                  color="neutral.800"
                  backgroundColor="neutral.0"
                  _hover={{ bg: "neutral.50" }}
                  _active={{ bg: "neutral_800" }}
                  rightIcon={
                    <Image
                      src="/icons/chevron_down.svg"
                      alt="Chevron Down"
                      width="16px"
                      height="16px"
                    />
                  }
                >
                  {!!selectedToken ? token(selectedToken) : "Select Token"}
                </MenuButton>
                <MenuList backgroundColor="neutral.0" borderWidth="0px">
                  {
                    tokens.map(it => {
                      return (
                        <MenuItem
                          key={it.address}
                          _hover={{ bg: "neutral.50" }}
                          _focus={{ bg: "neutral_800" }}
                          onClick={() => setSelectedToken(it)}
                        >
                          { token(it) }
                        </MenuItem>
                      );
                    })
                  }
                </MenuList>
              </Menu>

              <Input
                mt="16px"
                value={value}
                placeholder="0"
                color="neutral.800"
                borderWidth="0px"
                backgroundColor="neutral.0"
                isDisabled={!selectedToken}
                onChange={handleValueChange}
              />

              <Conversion
                selectedToken={selectedToken}
                value={value}
              />

              {allowance !== undefined && selectedToken && value && approvalNeeded(value) && (
                <Box
                  as={Button}
                  mt={"16px"}
                  backgroundColor="primary.800"
                  borderRadius="6px"
                  py="12px"
                  width="100%"
                  textAlign="center"
                  _hover={{ bg: "primary.700" }}
                  color="neutral.0"
                  textStyle="app_reg_14"
                  disabled={isApproved || isApproving || isLoadingAllowance}
                  isLoading={isApproving || isLoadingAllowance}
                  onClick={approvePayment}
                >
                  <Flex justifyContent="space-between" width="100%">
                    <Flex alignItems="center">
                      <Image
                        src="/icons/check.svg"
                        alt="Check icon"
                        width="16px"
                        height="16px"
                      />
                    </Flex>
                    <Box>
                      Allow Wisp to  use your {selectedToken?.symbol}
                    </Box>
                    <Flex alignItems="center">
                      <Tooltip
                        label={`You must give the Wisp smart contract permission to use your ${selectedToken.symbol}. You only have to do this once per token.`}
                        placement="top"
                        width="250px"
                        p="12px"
                        borderRadius="12px"
                        textStyle="app_med_10"
                        backgroundColor="neutral.900"
                        color="neutral.0"
                      >
                        <Image
                          src="/icons/question.svg"
                          alt="Question icon"
                          width="16px"
                          height="16px"
                        />
                      </Tooltip>
                    </Flex>
                  </Flex>
                </Box>
              )}

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
                    src="/icons/check.svg"
                    alt="Check icon"
                    width="16px"
                    height="16px"
                  />
                }
                _hover={{ bg: "primary.700" }}
                color="neutral.0"
                textStyle="app_reg_14"
                isDisabled={!selectedToken || !value || Number(value) <= 0 || approvalNeeded(value) || depositApproving}
                isLoading={isConfirming || isLoadingAllowance || depositApproving}
                onClick={executePayment}
              >
                {
                  !selectedToken
                    ? 'Select Token'
                    : depositApproving
                      ? 'Approving Deposit'
                      : 'Complete Deposit'
                }
              </Box>

              {error && <Text mt="12px" color="red" textStyle="app_reg_14" textAlign="center">
                {error}
              </Text>}
            </>
          )}

          {isSubmitted && transactionHash && (
            <PaymentStatus status={Payment.SUBMITTED} hash={transactionHash} />
          )}

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
