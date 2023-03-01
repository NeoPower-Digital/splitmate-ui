import { WalletAccount } from "@talismn/connect-wallets";
import { atom } from "jotai";

export const accountAtom = atom<WalletAccount | null>(null);
