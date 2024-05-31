import { Box, Button, Flex, Image, Text, Tooltip, } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Wallet from "../../components/Wallet";
import { AuthContext } from "../../contexts/AuthContext";
import { Token, tokens } from "../../util/tokens";
import { DecodedPath, decodeLinkPath } from "../../util/linkPathCodec";
import { ethers } from "ethers";
import { ERC20, ERC20__factory, Wisp__factory } from "../../contracts";
import { WISP_CONTRACT } from "../../util/contracts";
import PaymentStatus, { Payment } from "./PaymentStatus";
import { TransactionContext } from "../../contexts/TransactionContext";

type Props = { id: string }

const PaymentOneTime = ({ id }: Props) => {
  const { account, connectWallet, disconnect, isWalletLoading, web3Provider } = useContext(AuthContext);
  const { setIsPendingModalOpen, setTransactionHash, setIsPending, isPending, transactionHash } = useContext(TransactionContext);

  const [error, setError] = useState<string>("");

  const [balance, setBalance] = useState<string | undefined>();
  const [requestedAmount, setRequestedAmount] = useState<string | undefined>();
  const [requestedToken, setRequestedToken] = useState<Token | undefined>();
  const [tokenContract, setTokenContract] = useState<ERC20 | undefined>();
  const [needsApproval, setNeedsApproval] = useState<boolean>();
  const [decodedPath, setDecodedPath] = useState<DecodedPath | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const decodedPath = decodeLinkPath(id as string);
    setDecodedPath(decodedPath);
    setRequestedAmount(ethers.utils.formatEther(decodedPath.amount));
    setRequestedToken(tokens.find(it => it.address === decodedPath.token));
  }, [id]);

  useEffect(() => {
    if (!requestedToken || !web3Provider || !account) {
      return;
    }

    const tokenContract = ERC20__factory.connect(requestedToken.address, web3Provider.getSigner(0));
    setTokenContract(tokenContract);
    if(account) {
      tokenContract.balanceOf(account)
        .then(balance => setBalance(ethers.utils.formatEther(balance)))
        .catch(console.log);
    }
  }, [requestedToken, account, web3Provider]);

  useEffect(() => {
    if (!tokenContract || !requestedAmount || !account) {
      return;
    }

    if(account) {
      tokenContract.allowance(account, WISP_CONTRACT)
        .then(allowance => setNeedsApproval(ethers.utils.parseEther(requestedAmount).gt(allowance)))
        .catch(console.log);
    }
  }, [tokenContract, account, requestedAmount]);

  const approvePayment = async () => {
    if (!tokenContract || !requestedAmount || !web3Provider) {
      return;
    }

    try {
      setIsLoading(true);
      const transaction = await tokenContract.approve(WISP_CONTRACT, ethers.utils.parseEther(requestedAmount));

      setIsPending(true);
      setIsPendingModalOpen(true);
      setTransactionHash(transaction.hash);

      const result = await web3Provider.waitForTransaction(transaction.hash);
      if(result.status) {
        setIsPending(false);
        setIsPendingModalOpen(false);
        setTransactionHash(undefined);
        setNeedsApproval(false);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const executePayment = async () => {
    if (!web3Provider || !decodedPath) {
      return;
    }

    const wisp = Wisp__factory.connect(WISP_CONTRACT, web3Provider.getSigner(0));

    try {
      setIsLoading(true);
      const transaction = await wisp.deposit(
        decodedPath.proof,
        decodedPath.commitment,
        decodedPath.publicKey,
        decodedPath.amount,
        decodedPath.token,
        decodedPath.encryptedData
      );

      if (transaction?.hash) {
        setTransactionHash(transaction?.hash);
        setIsSubmitted(true);
      }
      // await transaction.wait(1);
    } catch (error: any) {
      setError(error.reason);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box backgroundColor="neutral.0" p="24px" borderRadius="12px" borderWidth="1px" borderColor="neutral.100">
      {!isSubmitted && (
        <>
          <Text color="neutral.800" textStyle="app_med_18" textAlign="center">
            Payment Request
          </Text>
          {!account && <Text color="neutral.400" textStyle="app_reg_14" textAlign="center">
            Please connect your wallet to make payment
          </Text>}
          <Box borderRadius="12px" backgroundColor="neutral.50" p="16px" mt="16px">
            {account && <Text color="neutral.500" textStyle="app_reg_14" textAlign="center">
              Your balance: {balance} {requestedToken?.symbol}
            </Text>}
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                <Image
                  src={`/icons/${requestedToken?.symbol.toLowerCase()}_logo.svg`}
                  alt="Token Logo"
                  width="30px"
                  height="30px"
                />
              </Box>
              <Box ml="8px">
                <Text color="neutral.800" textStyle="app_reg_24">{requestedAmount} {requestedToken?.symbol}</Text>
              </Box>
            </Box>
            {/* <Box textAlign="center">
              <Conversion
                selectedToken={requestedToken}
                value={requestedAmount}
              />
            </Box> */}
          </Box>

          {error && <Text mt="12px" color={"red.light"} textStyle="app_reg_14" textAlign="center">
            {`Error: ${error}`}
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
            : needsApproval
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
                      Allow Wisp to use your {requestedToken?.symbol}
                    </Box>
                    <Flex alignItems="center">
                      <Tooltip
                        label={`You must give the Wisp smart contract permission to use your ${requestedToken?.symbol}. You only have to do this once per token.`}
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
              )
            }
          </>
        )}
        {isSubmitted && transactionHash && (
          <PaymentStatus status={Payment.SUBMITTED} hash={transactionHash} />
        )}
    </Box>
  )
};

export default PaymentOneTime;