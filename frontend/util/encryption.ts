import { decrypt, encrypt, EthEncryptedData } from "@metamask/eth-sig-util";

const version = "x25519-xsalsa20-poly1305";

const packEncrypted = (data: EthEncryptedData): Buffer => {
  const nonce = Buffer.from(data.nonce, "base64");
  const ephemPublicKey = Buffer.from(data.ephemPublicKey, "base64");
  const ciphertext = Buffer.from(data.ciphertext, "base64");
  return Buffer.concat([
    Buffer.alloc(24 - nonce.length),
    nonce,
    Buffer.alloc(32 - ephemPublicKey.length),
    ephemPublicKey,
    ciphertext,
  ]);
}

const unpackEncrypted = (packedData: string): EthEncryptedData => {
  if (packedData.startsWith("0x")) {
    packedData = packedData.slice(2);
  }

  const data = Buffer.from(packedData, "hex");
  const nonce = data.slice(0, 24);
  const ephemPublicKey = data.slice(24, 56);
  const ciphertext = data.slice(56)
  return {
    version: version,
    nonce: nonce.toString("base64"),
    ephemPublicKey: ephemPublicKey.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  }
}

export const encryptData = (publicKey: string, data: Uint8Array): Buffer => {
  return packEncrypted(encrypt({
    publicKey: publicKey,
    data: Buffer.from(data).toString("base64"),
    version: version
  }));
}

export const decryptData = (privateKey: string, encryptedData: string): Buffer => {
  return Buffer.from(decrypt({
    encryptedData: unpackEncrypted(encryptedData),
    privateKey: privateKey
  }), "base64");
}