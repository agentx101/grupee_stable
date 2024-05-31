import {
  FreighterModule,
  StellarWalletsKit,
  WalletNetwork,
  XBULL_ID,
  xBullModule
} from '@creit.tech/stellar-wallets-kit/build/index';

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: [
    new xBullModule(),
    new FreighterModule(),
  ]
});

export  {
  kit
}
// import { useState, useEffect } from 'react';
// import { isConnected, getPublicKey, signTransaction } from "@stellar/freighter-api";
// import StellarSdk from "stellar-sdk";

// const useWallet = () => {
//   const [publicKey, setPublicKey] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkConnection = async () => {
//       if (await isConnected()) {
//         const pubKey = await getPublicKey();
//         setPublicKey(pubKey);
//       }
//       setIsLoading(false);
//     };

//     checkConnection();
//   }, []);

//   const connectWallet = async () => {
//     if (!await isConnected()) {
//       alert("Please install the Freighter wallet extension.");
//       return;
//     }

//     const pubKey = await getPublicKey();
//     setPublicKey(pubKey);
//   };

//   const submitTransaction = async (transactionXDR) => {
//     try {
//       const signedXDR = await signTransaction(transactionXDR, "TESTNET");
//       const server = new StellarSdk.Server("https://soroban-testnet.stellar.org");
//       const transaction = new StellarSdk.Transaction(signedXDR, StellarSdk.Networks.TESTNET);
//       const result = await server.submitTransaction(transaction);
//       console.log("Transaction successful:", result);
//     } catch (error) {
//       console.error("Transaction failed:", error);
//     }
//   };

//   return { publicKey, connectWallet, submitTransaction, isLoading };
// };

// export default useWallet;


// import { isConnected, getPublicKey, signTransaction } from "@stellar/freighter-api";

// const connectWallet = async () => {
//   if (!await isConnected()) {
//     alert("Please install the Freighter wallet extension.");
//     return null;
//   }

//   const pubKey = await getPublicKey();
//   return pubKey;
// };

// export default connectWallet;


// // export const providerOptions = {
// //   walletlink: {
// //     package: CoinbaseWalletSDK,
// //     options: {
// //       appName: "Wisp",
// //       infuraId: process.env.NEXT_PUBLIC_INFURA_KEY
// //     }
// //   },
// //   walletconnect: {
// //     package: WalletConnect,
// //     options: {
// //       infuraId: process.env.NEXT_PUBLIC_INFURA_KEY
// //     }
// //   },
// //   freighter: {
// //     package: {
// //       isConnected,
// //       getPublicKey,
// //       signTransaction,
// //     },
// //     options: {
// //       appName: "Wisp",
// //     },
// //   },

// // };