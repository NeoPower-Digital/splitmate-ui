import { DebtsByGroup } from '@/model/debts';
import { atom } from 'jotai';

export const debtsByGroupAtom = atom<Array<DebtsByGroup>>([]);
