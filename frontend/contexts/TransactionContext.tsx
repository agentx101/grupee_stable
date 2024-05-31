import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';


export enum TransactionType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
  Transfer = 'Transfer',
}

export enum TransactionStatus {
  Approving = 'Approving',
  Confirming = 'Confirming'
}

export interface Transaction {
  type: TransactionType;
  status: TransactionStatus;
  hash: string;
}

type TransactionContextType = {
  isPending: boolean,
  setIsPending: (isPending: boolean) => void,
  isPendingModalOpen: boolean,
  setIsPendingModalOpen: (isPendingModalOpen: boolean) => void,
  transactionHash: string | undefined,
  setTransactionHash: (transactionHash: string | undefined) => void,
  multiplePendingTransactions: Transaction[],
  setMultiplePendingTransactionsStorage: (multiplePendingTransactions: Transaction[]) => void,
  depositApproving: boolean,
  withdrawApproving: boolean,
  transferApproving: boolean,
}

export const TransactionContext = createContext<TransactionContextType>({
  isPending: false,
  setIsPending: () => {}, 
  isPendingModalOpen: false,
  setIsPendingModalOpen: () => {},
  transactionHash: undefined,
  setTransactionHash: () => {},
  multiplePendingTransactions: [],
  setMultiplePendingTransactionsStorage: () => {},
  depositApproving: false,
  withdrawApproving: false,
  transferApproving: false
});

export const TransactionContextProvider = (props: any) => {
  const { children } = props;
  
  const { web3Provider, getWeb3Provider } = useContext(AuthContext);

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);

  const [multiplePendingTransactions, setMultiplePendingTransactions] = useState<Transaction[]>([]);

  const setMultiplePendingTransactionsStorage = (transactions: Transaction[]) => {
    setMultiplePendingTransactions(transactions);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  const digestTransactions = async (transactions: Transaction[]) => {
    for (let i = 0; i < transactions.length; i++) {
      const transactionHash = transactions[i].hash;
      web3Provider?.waitForTransaction(transactionHash)
        .then(transactionReceipt => {
          if (transactionReceipt) {
            const newTransactions = [...multiplePendingTransactions];
            newTransactions.splice(i, 1);
            setMultiplePendingTransactionsStorage(newTransactions);
          }
        })
        .catch(err => {
          console.warn("Failed to wait for transaction", err);
        })
    }
  }

  useEffect(() => {
    const transactions = localStorage.getItem("transactions");
    if (transactions && web3Provider) {
      const parsedTransactions = JSON.parse(transactions)
      setMultiplePendingTransactions(parsedTransactions);
      digestTransactions(parsedTransactions);
    }
  }, [web3Provider])

  const depositApproving = multiplePendingTransactions.some(el => el.type === TransactionType.Deposit && el.status === TransactionStatus.Approving);
  const withdrawApproving = multiplePendingTransactions.some(el => el.type === TransactionType.Withdraw && el.status === TransactionStatus.Approving);
  const transferApproving = multiplePendingTransactions.some(el => el.type === TransactionType.Transfer && el.status === TransactionStatus.Approving);

  return (
    <TransactionContext.Provider
      value={{
        isPending,
        setIsPending,
        isPendingModalOpen,
        setIsPendingModalOpen,
        transactionHash,
        setTransactionHash,

        multiplePendingTransactions,
        setMultiplePendingTransactionsStorage,

        depositApproving,
        withdrawApproving,
        transferApproving
      }}>
      {children}
    </TransactionContext.Provider>
  )
}
