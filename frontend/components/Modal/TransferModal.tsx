import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { Token, tokens } from "../../util/tokens";
import Conversion from "../Conversion";
import { useQuery } from "@apollo/client";
import { GET_PAYMENTS_QUERY, GetPaymentsResult } from "../../util/thegraph";
import { Note, parseNoteFromBuff } from "../../util/note";
import { decryptData, encryptData } from "../../util/encryption";
import { randomBN } from "../../util/random";
import { generateTransactionProof } from "../../util/proof";
import { Wisp__factory } from "../../contracts";
import { WISP_CONTRACT } from "../../util/contracts";
import { AuthContext } from "../../contexts/AuthContext";
import { poseidonHash } from "../../util/hasher";
import { buildTree } from "../../util/merkleTree";
import { MerkleTree } from "fixed-merkle-tree";
import { Element } from "fixed-merkle-tree/src";
import { bitArrayToNumber } from "../../util/array";
import { TransactionContext, Transaction, TransactionType, TransactionStatus } from "../../contexts/TransactionContext";
import PaymentStatus, { Payment } from "../Payment/PaymentStatus";

type MerkleProof = {
  pathElements: Element[],
  pathIndices: number[]
}

type InputNote = {
  privateKey: string,
  sharedKeyPair: boolean,
  blinding: string,
  amount: BigNumber,
  merkleProof: MerkleProof,
  nullifier: string
}

const TransferModal = (props: any) => {
  const { isOpen, onClose } = props;

  const { web3Provider, personalKeypair, sharedKeypair, account } = useContext(AuthContext);

  const [value, setValue] = useState<string | undefined>(undefined);
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(undefined);
  const [wallet, setWallet] = useState<string | undefined>(undefined);

  const [merkleTree, setMerkleTree] = useState<MerkleTree | undefined>();

  const { data } = useQuery(GET_PAYMENTS_QUERY);

  const {
    setTransactionHash,
    transactionHash,
    multiplePendingTransactions,
    setMultiplePendingTransactionsStorage,
    transferApproving
  } = useContext(TransactionContext);

  const [error, setError] = useState<string>("");
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!data) {
      return;
    }
    setMerkleTree(buildTree(data.payments.map((it: any) => it.commitment)));
  }, [data]);

  const resetFields = () => {
    if(!isApproving && !isConfirming) {
      setValue(undefined);
      setWallet(undefined);
      setError("");
      setSelectedToken(undefined);
      setTransactionHash(undefined);
      setIsSubmitted(false);
      setIsApproving(false);
      setIsConfirming(false);
    }
  };

  const handleValueChange = (event: any) => setValue(event.target.value);
  const handleWalletChange = (event: any) => setWallet(event.target.value);

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

  const transfer = async () => {
    if (!selectedToken || !value || !wallet || !web3Provider || !merkleTree || !personalKeypair || !sharedKeypair) {
      return;
    }

    setIsConfirming(true);

    const amount = ethers.utils.parseEther(value.toString());

    const wisp = Wisp__factory.connect(WISP_CONTRACT, web3Provider.getSigner(0));
    const privateKey = personalKeypair.privateKey!;

    const inputNotes: InputNote[] = [];
    const paymentsData = (data as GetPaymentsResult);
    for (const p of paymentsData.payments) {
      let sharedKeyPair: boolean;
      if (p.publicKey === personalKeypair.publicKey) {
        sharedKeyPair = false;
      } else if (p.publicKey === sharedKeypair.publicKey) {
        sharedKeyPair = true;
      } else {
        continue;
      }

      let decryptedNote: Note;
      try {
        decryptedNote = parseNoteFromBuff(decryptData(privateKey.slice(2), p.encryptedData));
      } catch (e) {
        console.log("Error while parsing payment note with index", p.id);
        console.log(e);
        continue;
      }

      const token = tokens.find(it => it.address === decryptedNote.token);
      if (!token || token.address !== selectedToken.address) {
        console.log("Unsupported token at payment with index", p.id);
        continue;
      }

      const commitment = poseidonHash([decryptedNote.publicKey, decryptedNote.blinding, decryptedNote.amount, decryptedNote.token]);
      const merkleProof = merkleTree.proof(commitment.toString());
      const nullifier = poseidonHash([privateKey, commitment, BigNumber.from(bitArrayToNumber(merkleProof.pathIndices))]);

      const spent = await wisp.spentNullifiers(nullifier);
      if (spent) {
        console.log("Payment with index", p.id, "already spent");
        continue;
      }

      inputNotes.push({
        privateKey: privateKey,
        sharedKeyPair: sharedKeyPair,
        blinding: decryptedNote.blinding,
        amount: decryptedNote.amount,
        merkleProof: merkleProof,
        nullifier: nullifier.toString(),
      });
    }

    inputNotes.sort((a, b) => {
      return a.amount.lte(b.amount) ? -1 : 1;
    });

    // todo: find a better way to choose input notes
    // todo: check that we actually have enough notes
    let inputNote1 = inputNotes[0];
    let inputNote2 = inputNotes[1];
    for (let i = 0; i < inputNotes.length; i++) {
      for (let j = i + 1; j < inputNotes.length; j++) {
        if (inputNotes[i].amount.add(inputNotes[j].amount).gte(amount)) {
          inputNote1 = inputNotes[i];
          inputNote2 = inputNotes[j];
        }
      }
    }

    const outPublicKeys = [personalKeypair.publicKey, personalKeypair.publicKey];
    const outBlinding1 = randomBN();
    const outBlinding2 = randomBN();
    const outAmount1 = inputNote1.amount.add(inputNote2.amount).sub(amount);
    const outAmount2 = BigNumber.from(0);

    const outCommitment1 = poseidonHash([outPublicKeys[0], outBlinding1, outAmount1, selectedToken.address]);
    const outCommitment2 = poseidonHash([outPublicKeys[1], outBlinding2, outAmount2, selectedToken.address]);

    const input = {
      privateKey: personalKeypair.privateKey!,
      nonce: [inputNote1.sharedKeyPair ? "123" : "321", inputNote2.sharedKeyPair ? "123" : "321"],
      currency: selectedToken.address,
      inBlinding: [inputNote1.blinding, inputNote2.blinding],
      inAmount: [inputNote1.amount.toString(), inputNote2.amount.toString()],
      root: merkleTree.root.toString(),
      pathElements: [[...inputNote1.merkleProof.pathElements].map(it => it.toString()), [...inputNote2.merkleProof.pathElements].map(it => it.toString())],
      pathIndices: [[...inputNote1.merkleProof.pathIndices], [...inputNote2.merkleProof.pathIndices]],
      recipient: wallet,
      withdrawnAmount: amount.toString(),
      outPublicKey: outPublicKeys,
      outBlinding: [outBlinding1.toString(), outBlinding2.toString()],
      outAmount: [outAmount1.toString(), outAmount2.toString()]
    };
    
    try {
      const proof = await generateTransactionProof(input);
      const encryptedData1 = encryptData(personalKeypair.encryptionKey, Buffer.concat([
        ethers.utils.arrayify(personalKeypair.publicKey),
        ethers.utils.arrayify(outBlinding1),
        ethers.utils.arrayify(outAmount1),
        ethers.utils.arrayify(selectedToken.address),
      ]));
      const encryptedData2 = encryptData(personalKeypair.encryptionKey, Buffer.concat([
        ethers.utils.arrayify(personalKeypair.publicKey),
        ethers.utils.arrayify(outBlinding2),
        ethers.utils.arrayify(outAmount2),
        ethers.utils.arrayify(selectedToken.address),
      ]));

      const transaction = await wisp.transaction(proof,
        [inputNote1.nullifier, inputNote2.nullifier],
        merkleTree.root.toString(), wallet, selectedToken.address, amount,
        [outPublicKeys[0], outPublicKeys[1]],
        [outCommitment1, outCommitment2],
        [encryptedData1, encryptedData2]);
      
        setTransactionHash(transaction?.hash);
        const transactionConfirming: Transaction = {
          type: TransactionType.Transfer,
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
      <ModalOverlay/>
      <ModalContent backgroundColor="neutral.100" pb="12px">
        <ModalHeader textStyle="app_med_18" color="neutral.800">
          Transfer
        </ModalHeader>
        <ModalCloseButton color="neutral.800"/>
        <ModalBody>
          {!isSubmitted && (
            <>
              <Text textStyle="app_reg_12" color="neutral.800">
                Transfer funds to a wallet
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
                backgroundColor="neutral.0"
                isDisabled={!selectedToken}
                onChange={handleValueChange}
              />

              <Input
                mt="16px"
                value={wallet}
                placeholder="Wallet Address"
                color="neutral.800"
                borderWidth="0px"
                backgroundColor="neutral.0"
                isDisabled={!selectedToken}
                onChange={handleWalletChange}
              />

              <Conversion
                selectedToken={selectedToken}
                value={value}
              />

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
                isDisabled={!selectedToken || !value || Number(value) <= 0 || transferApproving || !wallet || (wallet || "").length !== 42}
                isLoading={isConfirming || transferApproving}
                onClick={transfer}
              >
                {
                  !selectedToken
                    ? 'Select Token'
                    : transferApproving
                      ? 'Approving Transfer'
                      : 'Complete Transfer'
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

export default TransferModal;
