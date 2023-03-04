import { DebtsByGroup } from '@/model/splitmate';
import { atom } from 'jotai';

export const debtsByGroupAtom = atom<Array<DebtsByGroup>>([]);
