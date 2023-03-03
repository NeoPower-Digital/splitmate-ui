import { ObjectValues } from './utils';

export const QUERIES = {
  GET_DEBTS_BY_GROUP: 'GET_DEBTS_BY_GROUP',
} as const;

export type Queries = ObjectValues<typeof QUERIES>;
