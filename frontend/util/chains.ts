export interface Chain {
  id: string,
  hexId: string,
  label: string,
  icon: string
}

export const chains: Chain[] = [
  {
    id: "1",
    hexId: "0x1",
    label: "Ethereum Mainnet",
    icon: "/icons/networks/ethereum.svg"
  },
  // {
  //   id: "4",
  //   hexId: "0x4",
  //   label: "Rinkeby Testnet",
  //   icon: "/icons/networks/ethereum.svg"
  // },
  {
    id: "137",
    hexId: "0x89",
    label: "Polygon Mainnet",
    icon: "/icons/networks/polygon.svg"
  },
  {
    id: "80001",
    hexId: "0x13881",
    label: "Mumbai Testnet",
    icon: "/icons/networks/polygon.svg"
  }
];