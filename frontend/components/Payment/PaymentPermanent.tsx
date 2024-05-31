import { Box, Button, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Token, tokens } from "../../util/tokens";
import { BigNumber, ethers } from "ethers";
import { ERC20__factory, Wisp__factory } from "../../contracts";
import { WISP_CONTRACT } from "../../util/contracts";
import { getDepositData } from "../../util/deposit";
import { Keypair } from "../../util/keypair";
import PaymentStatus, { Payment } from "./PaymentStatus";
import { TransactionContext } from "../../contexts/TransactionContext";
import Wallet from "../Wallet";

type Props = { id: string }

const PaymentPermanent = ({ id }: Props) => {
  const { account, connectWallet, disconnect, isWalletLoading, web3Provider } = useContext(AuthContext);
  const { setIsPendingModalOpen, setTransactionHash, setIsPending, transactionHash } = useContext(TransactionContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [value, setValue] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<Token | undefined>();
  const [allowance, setAllowance] = useState<BigNumber | undefined>();
  const [sharedKeypair, setSharedKeypair] = useState<Keypair | undefined>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const publicKey = "0x" + id.slice(0, 64);
    const encryptionKey = Buffer.from(id.slice(64, 128), "hex").toString("base64");

    setSharedKeypair(Keypair.fromSharedKey(publicKey, encryptionKey));
  }, [id])

  useEffect(() => {
    if (!selectedToken || !web3Provider || !account) {
      return
    }

    const tokenContract = ERC20__factory.connect(selectedToken.address, web3Provider.getSigner(0));
    tokenContract.allowance(account, WISP_CONTRACT)
      .then(allowance => setAllowance(allowance))
      .catch(console.log);
  }, [selectedToken, web3Provider, account]);

  const handleValueChange = (event: any) => {
    setValue(event.target.value);
  }

  const token = (token: Token) => {
    return (
      <Box flexDirection="row" display="flex">
        <Box>
          <Image
            src={`/icons/${token.symbol.toLowerCase()}_logo.svg`}
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
  }

  const approvalNeeded = (value: string | undefined): boolean => {
    if (isNaN(Number(value)) || !value || !allowance || Number(value) <= 0) {
      return true;
    }

    return ethers.utils.parseEther(value).gt(allowance);
  }

  const approvePayment = async () => {
    if (!selectedToken || !web3Provider || !value) {
      return
    }

    try {
      setIsLoading(true);
      const valueAsBigNumber = ethers.utils.parseEther(value);
      const tokenContract = ERC20__factory.connect(selectedToken.address, web3Provider.getSigner(0));
      const transaction = await tokenContract.approve(WISP_CONTRACT, valueAsBigNumber);
      setAllowance(valueAsBigNumber);

      setIsPending(true);
      setIsPendingModalOpen(true);
      setTransactionHash(transaction.hash);

      const result = await web3Provider.waitForTransaction(transaction.hash);
      if(result.status) {
        setIsPending(false);
        setIsPendingModalOpen(false);
        setTransactionHash(undefined);
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const executePayment = async () => {
    if (!selectedToken || !web3Provider || !value || !sharedKeypair) {
      return;
    }
    const valueAsBigNumber = ethers.utils.parseEther(value);
    const depositData = await getDepositData(sharedKeypair, valueAsBigNumber, selectedToken.address);
    const wisp = Wisp__factory.connect(WISP_CONTRACT, web3Provider.getSigner(0));

    try {
      setIsLoading(true);
      const transaction = await wisp.deposit(
        depositData.proof,
        depositData.commitment,
        "0x" + Buffer.from(depositData.publicKey).toString("hex"),
        "0x" + Buffer.from(depositData.amount).toString("hex"),
        "0x" + Buffer.from(depositData.token).toString("hex"),
        "0x" + depositData.encryptedData.toString("hex")
      );

      if (transaction?.hash) {
        setTransactionHash(transaction?.hash);
        setIsSubmitted(true);
      }
    } catch (error: any) {
      setError(error.reason);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box backgroundColor="neutral.0" p="24px" borderRadius="12px" borderWidth="1px" borderColor="neutral.100">
      {!isSubmitted && (
        <>
          <Box>
            <Text color="neutral.800" textStyle="app_med_18" textAlign="center">
              Payment Link
            </Text>
          </Box>
          <Box mt="8px">
            <Text color="neutral.800" textStyle="app_reg_14" textAlign="center">
              Please select token and amount to send
            </Text>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                mt="32px"
                width="100%"
                textAlign={"left"}
                color="neutral.800"
                backgroundColor="neutral.100"
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
                        {token(it)}
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
              backgroundColor="neutral.100"
              isDisabled={!selectedToken}
              onChange={handleValueChange}
            />

          </Box>

          {error && <Text mt="12px" color="neutral.800" textStyle="app_reg_14" textAlign="center">
            {`You don't have enough token on your account`}
          </Text>}

          {!account
            ? <Box
                mt="32px"
                textAlign="center"
              >
                <Wallet
                  account={account}
                  connectWallet={connectWallet}
                  disconnect={disconnect}
                  isLoading={isWalletLoading}
                />
              </Box>
            : approvalNeeded(value)
            ? (
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
                isLoading={isLoading}
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
                    Allow Wisp to use your {selectedToken?.symbol}
                  </Box>
                  <Flex alignItems="center">
                    <Tooltip
                      label={`You must give the Wisp smart contract permission to use your ${selectedToken?.symbol}. You only have to do this once per token.`}
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
            )
            : (
              <Box
                as={Button}
                backgroundColor="primary.800"
                borderRadius="6px"
                mt="32px"
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
                isLoading={isLoading}
                onClick={executePayment}
              >
                Pay
              </Box>
            )}
          </>
      )}

      {isSubmitted && transactionHash && (
          <PaymentStatus status={Payment.SUBMITTED} hash={transactionHash} />
        )}
    </Box>
  )
};

export default PaymentPermanent;