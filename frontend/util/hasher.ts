import { BigNumber, BigNumberish } from "ethers";
// @ts-ignore
import { buildPoseidon } from "circomlibjs";

const poseidonInstance = await buildPoseidon();

export const poseidonHash = (items: BigNumberish[]) => {
  const hash = poseidonInstance(items);
  return BigNumber.from(poseidonInstance.F.toString(hash));
}