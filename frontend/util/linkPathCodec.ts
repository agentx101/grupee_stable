import { BigNumber, ethers } from "ethers";
import { Keypair } from "./keypair";
import { getDepositData } from "./deposit";

export const generatePermanentLinkPath = (keypair: Keypair): string => {
  return keypair.publicKey.slice(2) + Buffer.from(keypair.encryptionKey, "base64").toString("hex");
}

export const generateOneTimeLinkPath = async (keypair: Keypair, amount: BigNumber, token: string) => {
  const depositData = await getDepositData(keypair, amount, token);
  return Buffer.concat([
    ethers.utils.arrayify(depositData.proof), // 256 bytes
    ethers.utils.arrayify(depositData.commitment), // 32 bytes
    Buffer.alloc(32 - depositData.publicKey.length), depositData.publicKey, // 32 bytes
    depositData.token, // 20 bytes
    Buffer.alloc(32 - depositData.amount.length), depositData.amount,  // 32 bytes
    depositData.encryptedData // arbitrary length
  ]).toString("hex");
}

export type DecodedPath = {
  proof: string;
  commitment: string;
  publicKey: string;
  token: string;
  amount: BigNumber,
  encryptedData: string;
}

export const decodeLinkPath = (path: string): DecodedPath => {
  const pathBuffer = Buffer.from(path, "hex");

  return {
    proof: "0x" + pathBuffer.slice(0, 256).toString("hex"),
    commitment: "0x" + pathBuffer.slice(256, 288).toString("hex"),
    publicKey: "0x" + pathBuffer.slice(288, 320).toString("hex"),
    token: "0x" + pathBuffer.slice(320, 340).toString("hex"),
    amount: BigNumber.from(pathBuffer.slice(340, 372)),
    encryptedData: "0x" + pathBuffer.slice(372).toString("hex")
  }
}