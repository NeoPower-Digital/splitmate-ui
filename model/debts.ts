export interface Debt {
  address: string;
  amount: number;
}

export interface DebtsByGroup {
  groupId: number;
  debts: Array<Debt>;
}

export const debtsByGroupMock: Array<DebtsByGroup> = [
  {
    groupId: 1,
    debts: [
      {
        address: '0x0',
        amount: 10,
      },
      {
        address: '0x1',
        amount: 50,
      },
    ],
  },
  {
    groupId: 2,
    debts: [
      {
        address: '0x2',
        amount: 25,
      },
      {
        address: '0x3',
        amount: 60,
      },
      {
        address: '0x4',
        amount: 60,
      },
    ],
  },
  {
    groupId: 3,
    debts: [
      {
        address: '0x5',
        amount: 12,
      },
      {
        address: '0x6',
        amount: 24,
      },
      {
        address: '0x7',
        amount: 300,
      },
    ],
  },
];
