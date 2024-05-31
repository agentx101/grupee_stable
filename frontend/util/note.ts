import { Buffer } from "buffer";
import { BigNumber } from "ethers";

export type Note = {
  publicKey: string,
  blinding: string,
  amount: BigNumber,
  token: string
}

export const parseNoteFromBuff = (buffer: Buffer): Note => {
  return {
    publicKey: "0x" + buffer.slice(0, 32).toString("hex"),
    blinding: "0x" + buffer.slice(32, 63).toString("hex"),
    amount: BigNumber.from(buffer.slice(63, buffer.length - 20)),
    token: "0x" + buffer.slice(buffer.length - 20, buffer.length).toString("hex")
  }
}