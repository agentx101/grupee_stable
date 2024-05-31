import { randomBN } from "./random";
import { BigNumber, ethers } from "ethers";
import { encryptData } from "./encryption";
import { generateDepositProof } from "./proof";
import { poseidonHash } from "./hasher";
import { Keypair } from "./keypair";

export type DepositData = {
  proof: string,
  commitment: BigNumber,
  publicKey: Uint8Array,
  amount: Uint8Array,
  token: Uint8Array,
  encryptedData: Buffer
}

export const getDepositData = async (keypair: Keypair, amount: BigNumber, token: string): Promise<DepositData> => {
  const blinding = randomBN().toHexString();
  const publicKeyBuff = ethers.utils.arrayify(keypair.publicKey);
  const amountBuff = ethers.utils.arrayify(amount);
  const tokenBuff = ethers.utils.arrayify(token);
  const encryptedData = encryptData(keypair.encryptionKey, Buffer.concat([
    publicKeyBuff,
    ethers.utils.arrayify(blinding),
    amountBuff,
    tokenBuff,
  ]));
  const encryptedDataHash = ethers.utils.solidityKeccak256(["bytes"], [encryptedData]);

  const proof = await generateDepositProof({
    publicKey: keypair.publicKey,
    blinding: blinding,
    amount: amount.toString(),
    currency: token,
    encryptedDataHash: encryptedDataHash
  });

  const commitment = poseidonHash([keypair.publicKey, blinding, amount, token]);

  return {
    proof: proof,
    commitment: commitment,
    publicKey: publicKeyBuff,
    amount: amountBuff,
    token: tokenBuff,
    encryptedData: encryptedData
  }
}