import { atom } from 'jotai';

export interface PolkadotNetwork {
  chainName: string;
  chainURL: string;
  contractAddress: string;
  decimals?: number;
}

const ROCOCO = {
  chainName: 'Rococo',
  chainURL: 'wss://rococo-contracts-rpc.polkadot.io',
  contractAddress: '5FQBfuiBAn1AaMhH1xD2QUE2yK2r8AvyHtUnzKvktnPvQLeb',
  decimals: 12,
};

const SHIBUYA = {
  chainName: 'Shibuya',
  chainURL: 'wss://shibuya-rpc.dwellir.com',
  contractAddress: '-',
  decimals: 18,
};

const SHIDEN = {
  chainName: 'Shiden',
  chainURL: 'wss://shiden-rpc.dwellir.com',
  contractAddress: '-',
  decimals: 18,
};

export const CHAINS = [ROCOCO, SHIBUYA, SHIDEN];

export const networkAtom = atom<PolkadotNetwork>(ROCOCO);
