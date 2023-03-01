import { ApiPromise } from "@polkadot/api";
import { atom } from "jotai";

export const polkadotAPIAtom = atom<ApiPromise | null>(null);
