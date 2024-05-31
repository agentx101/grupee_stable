import { chains, Chain } from './chains';

export const chainIdToNetwork = (chainId: string) => chains.find((chain: Chain) => chain.id === chainId)?.label;