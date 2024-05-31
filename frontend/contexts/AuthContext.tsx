import React, { createContext, useEffect, useRef, useState } from 'react';
import { ethers } from "ethers";
import { web3Modal } from '../pages';
import { toHex } from '../util/toHex';
import { networks } from '../util/networks';
import { chains } from '../util/chains';
import {kit} from "../services/WalletConnect";
import { signAuthEntry,signBlob,signTransaction } from '@stellar/freighter-api';
import { Keypair, Networks, TransactionBuilder, Memo } from 'stellar-sdk';

type AuthContextType = {
  account: string | undefined,
  connectWallet:  () => {  },
  disconnect: () => {},
  isWalletLoading: boolean,
  web3Provider: ethers.providers.Web3Provider | undefined,
  getWeb3Provider: () => {},
  personalKeypair: Keypair | undefined,
  sharedKeypair: Keypair | undefined,
  isLoading: boolean,
  chainId: string | undefined,
  switchNetwork: (network: number) => Promise<void>,
}

export const AuthContext = createContext<AuthContextType>({
  account: undefined,
  async connectWallet() {},
  disconnect: async () => {},
  isWalletLoading: false,
  web3Provider: undefined,
  getWeb3Provider: async () => {},
  personalKeypair: undefined,
  sharedKeypair: undefined,
  isLoading: true,
  chainId: undefined,
  switchNetwork: async () => {}
});

export const AuthContextProvider = (props: any) => {
  const { children } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<string | undefined>(undefined);
  const [personalKeypair, setPersonalKeypair] = useState<Keypair>();
  const [sharedKeypair, setSharedKeypair] = useState<Keypair>();
  const [web3Provider, setWeb3Provider] = useState<Web3Provider | undefined>(undefined);
  const [provider, setProvider] = useState<any>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isWalletLoading, setIsWalletLoading] = useState<boolean>(false);

  const runningOnce = useRef(false);

  const getWeb3Provider = async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider) as Web3Provider;
    const network = await web3Provider.getNetwork();
    setProvider(provider);
    setWeb3Provider(web3Provider);
    setChainId(network.chainId.toString());
    return web3Provider;
  }

  const connectWallet = async () => {
    try {
      setIsWalletLoading(true);
      console.log("connecting wallet")
    await kit.openModal({
      onWalletSelected: async (option ) => {
        kit.setWallet(option.id);
        const publicKey = await kit.getPublicKey();
        setAccount(publicKey);
        console.log(account);
        console.log(isLoading);
        

        const { signedXDR } = await kit.signTx({
          xdr: '....',
          publicKey,
        });


      // Do something else
      }
    })
      
      // Get fresh instance of web3Provider instead of from state, because of race condition
      // const web3Provider = await getWeb3Provider();

      // // Retrieve signature on first sign in
      // if(!account && web3Provider) {
      //   const accounts = await web3Provider.listAccounts();
      //   const signature = await web3Provider.getSigner().signMessage("Please sign this message to log in to your Wisp account.");

      //   localStorage.setItem("account", accounts[0]);
      //   localStorage.setItem("personalKeypair", JSON.stringify(getPersonalKeypair(signature)));
      //   localStorage.setItem("sharedKeypair", JSON.stringify(getSharedKeypair(signature)));

      //   setPersonalKeypair(getPersonalKeypair(signature));
      //   setSharedKeypair(getSharedKeypair(signature));
      //   setAccount(accounts[0]);
      }
     catch (error: any) {
      setError(error);
    } finally {
      setIsWalletLoading(false);
    }
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    localStorage.removeItem("account");
    localStorage.removeItem("personalKeypair");
    localStorage.removeItem("sharedKeypair");
    setAccount(undefined);
    setPersonalKeypair(undefined);
    setSharedKeypair(undefined);

    setProvider(undefined);
    setWeb3Provider(undefined);
    setChainId(undefined);    
  };

  const switchNetwork = async (network: number) => {
    const networkHexId = toHex(network);
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkHexId }]
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            // @ts-ignore
            params: [networks[networkHexId]]
          });
        } catch (error: any) {
          setError(error);
        }
      }
    }
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("accountsChanged", accounts);
        if (accounts) {
          setAccount(accounts[0]);
          localStorage.setItem("account", accounts[0]);
        };
      };

      const handleChainChanged = (_hexChainId: number) => {
        chains.forEach(chain => {
          if (chain.hexId === _hexChainId.toString()) {
            setChainId(chain.id);
          }
        })
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    // In React 18 that mounts, unmounts, then remounts in strict mode
    if(!runningOnce.current) {
      runningOnce.current = true;
      setIsLoading(true);
      const account = localStorage.getItem("account");
      const personalKeypair = JSON.parse(localStorage.getItem("personalKeypair") as string);
      const sharedKeypair = JSON.parse(localStorage.getItem("sharedKeypair") as string);
      // const chainId = localStorage.getItem("chainId");

      if (account && personalKeypair && sharedKeypair) {
        setAccount(account);
        setPersonalKeypair(personalKeypair);
        setSharedKeypair(sharedKeypair);

        // Only retrieve web3Provider if already connected because
        // otherwise, it will show unnecessary modal prompting to connect
        getWeb3Provider().then().finally(() => {
          setIsLoading(false);
          runningOnce.current = false;
        });
      } else {
        setIsLoading(false);
        runningOnce.current = false;
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        account,
        connectWallet,
        disconnect,
        isWalletLoading,
        web3Provider,
        getWeb3Provider,
        personalKeypair,
        sharedKeypair,
        isLoading,
        chainId,
        switchNetwork
      }}>
      {children}
    </AuthContext.Provider>
  )
}
