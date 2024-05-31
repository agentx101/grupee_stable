export type Token = {
  symbol: string,
  name: string,
  address: string,
  icon: string,
}

export const tokens: Token[] = [
  {
    symbol: "USDC",
    name: "USDC Coin",
    address: "0x06f875b02a7a42ce6677360159b0c5598fb1eab1",
    icon: '/icons/usdc_logo.svg'
  }, {
    symbol: "ETH",
    name: "Ether",
    address: "0x0ffc5e6846d639b11a937d91e4ab62e05e2a642b",
    icon: '/icons/eth_logo.svg'
  }, {
    symbol: "UNI",
    name: "Uniswap",
    address: "0xc3d804b24f3ae0bcc9455c384ab31c783297f285",
    icon: '/icons/uni_logo.svg'
  }
]