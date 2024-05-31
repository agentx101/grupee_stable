import { MerkleTree } from "fixed-merkle-tree";
import { poseidonHash } from "./hasher";

const levels = 10;
const treeZeroElement = "8645981980787649023086883978738420856660271013038108762834452721572614684349";

export const buildTree = (elements: string[]): MerkleTree => {
  return new MerkleTree(levels, elements, {
    hashFunction: (a, b) => poseidonHash([a, b]).toString(),
    zeroElement: treeZeroElement
  });
}