export const truncateTx = (tx: string, digits: number) => {
  return `${tx.substring(0, digits + 2)}...${tx.substring(tx.length - digits, tx.length)}`;
}